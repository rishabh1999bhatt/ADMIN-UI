import { useContext } from "react";

import { UsersContext } from "../../contexts/users.context";

import "./header.styles.css";

const Header = ({ indicesRef }) => {
  const {
    isHeaderChecked,
    setIsHeaderChecked,
    selectedUsersMap,
    setSelectedUsersMap,
  } = useContext(UsersContext);

  const handleHeaderCheckbox = (e) => {
    setIsHeaderChecked(!isHeaderChecked);
    const currentPageUsers = [...indicesRef.current];
    if (e.target.checked) {
      for (let user of currentPageUsers) {
        selectedUsersMap.set(String(user), true);
      }
    } else {
      selectedUsersMap.clear();
    }
    setSelectedUsersMap(new Map(selectedUsersMap));
  };
  return (
    <div className="header">
      <div className="checkbox-container">
        <input
          checked={isHeaderChecked}
          onClick={handleHeaderCheckbox}
          type="checkbox"
        />
      </div>
      <div className="name">
        <span>Name</span>
      </div>
      <div className="email">
        <span>Email</span>
      </div>
      <div className="role">
        <span>Role</span>
      </div>
      <div className="actions">
        <span>Actions</span>
      </div>
    </div>
  );
};

export default Header;
