import { UsersListProps } from "./App";

function UsersTable({ users }: UsersListProps) {
  return (
    <div className="users-table-container">
      <table className="users-table">
        <thead className="users-table__head">
          <tr>
            <th>Name</th>
            <th>Registration Date</th>
            <th>Username</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody className="users-table__body">
          {users.map(
            ({
              lastName,
              firstName,
              email,
              registrationDate,
              UserName,
              gender,
              imageUrl,
            }) => (
              <tr key={`${UserName}`}>
                <td>
                  <div className="user-table-profile">
                    <img src={imageUrl} alt={firstName} />

                    <div>
                      <p>{`${lastName}, ${firstName}`}</p>
                      <p>{email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{registrationDate}</p>
                </td>
                <td>
                  <p>{UserName}</p>
                </td>
                <td>
                  <p>{gender}</p>
                </td>
              </tr>
            )
          )}
          {!users.length && (
            <tr>
              <td colSpan={4}>No user found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
