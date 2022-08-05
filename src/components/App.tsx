import { useEffect, useMemo, useState } from "react";
import { LAYOUT_OPTIONS } from "../constants";
import { useFetch } from "../hooks/useFetch";
import { usePagination } from "../hooks/usePagination";
import "./App.scss";
import Filters from "./Filters";
import LayoutSwitch from "./LayoutSwitch";
import Pagination from "./Pagination";
import UsersTable from "./UsersTable";
import UsersTile from "./UsersTile";

export interface UserData {
  lastName: string;
  firstName: string;
  email: string;
  registrationDate: string;
  UserName: string;
  gender: string;
  imageUrl: string;
}

const layoutOptionValues = Object.values(LAYOUT_OPTIONS);

export interface UsersListProps {
  users: UserData[];
  activeLayout: typeof layoutOptionValues[number];
}

const PAGE_SIZE: number = 10;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userGender, setUserGender] = useState("");

  const {
    response: { data: users },
    error,
    loading,
  } = useFetch<UserData[]>("/?results=50");

  const initialUsers = useMemo(() => users ?? [], [users]);

  const { getCurrentData, next, prev, jump, maxPage, currentPage } =
    usePagination(initialUsers, PAGE_SIZE);

  const [filteredUsers, setFilteredUsers] = useState(getCurrentData());

  useEffect(() => {
    if (!searchQuery && !userGender) {
      setFilteredUsers(getCurrentData());
      return;
    }

    let filteredUserList = getCurrentData();
    if (!!searchQuery) {
      filteredUserList = filteredUserList.filter(
        ({ firstName, lastName, email, UserName }: any) =>
          firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          UserName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (!!userGender) {
      filteredUserList = filteredUserList.filter(({ gender }: any) => {
        if (["male", "female"].includes(userGender)) {
          return gender.toLowerCase() === userGender.toLowerCase();
        } else {
          return gender;
        }
      });
    }

    setFilteredUsers(filteredUserList);
  }, [searchQuery, userGender, initialUsers, getCurrentData]);

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <main className="container app">
      <h1>User List</h1>
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={loading}
        userGender={userGender}
        setUserGender={setUserGender}
      />
      {loading && <h3>Loading Users...</h3>}
      {users !== null ? (
        <div>
          <LayoutSwitch defaultLayout={LAYOUT_OPTIONS.table}>
            <LayoutSwitch.Options>
              <LayoutSwitch.ToggleButton />
            </LayoutSwitch.Options>
            <LayoutSwitch.Content>
              <UsersTable
                activeLayout={LAYOUT_OPTIONS.table}
                users={filteredUsers}
              />
              <UsersTile
                activeLayout={LAYOUT_OPTIONS.tile}
                users={filteredUsers}
              />
            </LayoutSwitch.Content>
          </LayoutSwitch>
          <Pagination
            maxPage={maxPage}
            jump={jump}
            next={next}
            prev={prev}
            currentPage={currentPage}
          />
        </div>
      ) : (
        !loading && <h3>No Users Found</h3>
      )}
    </main>
  );
}

export default App;
