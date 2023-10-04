import { useContext } from "react";

import { UsersContext } from "../../contexts/users.context";

import "./user-tile.styles.css";

const UserTile = ({ handleCancelEdit, user, setUserToEdit }) => {
  const { id, name, email, role } = user;

  const { deleteSingleUser, selectedUsersMap, setSelectedUsersMap } =
    useContext(UsersContext);

  const handleEdit = () => {
    handleCancelEdit();
    setUserToEdit(id);
  };
  const handleDelete = () => deleteSingleUser(user);

  const handleCheckBox = () => {
    if (selectedUsersMap.has(id)) {
      selectedUsersMap.delete(id);
    } else {
      selectedUsersMap.set(id, user);
      setSelectedUsersMap(selectedUsersMap);
    }
    setSelectedUsersMap(new Map(selectedUsersMap));
  };
  return (
    <div
      className={`tile-container ${selectedUsersMap.has(id) ? "selected" : ""}`}
    >
      <div className="tile-checkbox-container">
        <input
          checked={selectedUsersMap.has(id) ? true : false}
          onClick={handleCheckBox}
          type="checkbox"
        />
      </div>
      <div className="user-name">
        <span>{name}</span>
      </div>
      <div className="user-email">
        <span>{email}</span>
      </div>
      <div className="user-role">
        <span>{role}</span>
      </div>
      <div className="user-actions">
        <button className="btn edit-button" onClick={handleEdit}>
          EDIT
        </button>
        <button className="btn delete-button" onClick={handleDelete}>
          DELETE
        </button>
      </div>
    </div>
  );
};

export default UserTile;
