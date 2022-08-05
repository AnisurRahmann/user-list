import { BsCalendar2Date } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { UsersListProps } from "./App";

export interface UserData {
  lastName: string;
  firstName: string;
  email: string;
  registrationDate: string;
  UserName: string;
  gender: string;
  imageUrl: string;
}

function UsersTile({ users }: UsersListProps) {
  return (
    <div className="user-tile-container">
      <div className="user-cards__list">
        {users.map(
          ({
            UserName,
            lastName,
            firstName,
            gender,
            registrationDate,
            imageUrl,
            email,
          }) => (
            <div key={`${UserName}`} className="user-card card">
              <img src={imageUrl} alt={firstName} />
              <div className="card-content">
                <p>{`${firstName} ${lastName}`}</p>
                <p className="user-email">{email}</p>
                <p>
                  <FaUser style={{ marginRight: "5px" }} />
                  <span>{UserName}</span>
                </p>
                <p>
                  <BsCalendar2Date style={{ marginRight: "5px" }} />
                  {registrationDate}
                </p>
              </div>
            </div>
          )
        )}
        {!users.length && <h3>No user found</h3>}
      </div>
    </div>
  );
}

export default UsersTile;
