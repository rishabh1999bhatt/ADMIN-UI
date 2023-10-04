import { useState, useRef, useEffect, useContext } from "react";

import { UsersContext } from "../../contexts/users.context";

import Header from "../header/header.component";
import UserTile from "../user-tile/user-tile.component";
import Pagination from "../pagination/pagination.component";

import "./directory.styles.css";

const defaultFormFields = {
  name: "",
  email: "",
  role: "",
};

const Directory = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userToEdit, setUserToEdit] = useState("");
  const [formFields, setFormFields] = useState(defaultFormFields);
  const indicesRef = useRef(new Set());

  const usersPerPage = 10;
  const startIndex = usersPerPage * (currentPage - 1);
  const endIndex = startIndex + usersPerPage;
  const lastPage = Math.ceil(filteredUsers.length / usersPerPage);

  const { users, updateUser, setIsHeaderChecked, deleteSelectedUsers } =
    useContext(UsersContext);

  useEffect(() => {
    const newFilteredUsers = users.filter(({ name, email, role }) => {
      return (
        name.toLowerCase().includes(searchString) ||
        email.toLowerCase().includes(searchString) ||
        role.toLowerCase().includes(searchString)
      );
    });
    setFilteredUsers(newFilteredUsers);
  }, [users, searchString]);

  const handleSearchBarChange = (event) => {
    setCurrentPage(1);
    indicesRef.current.clear();
    const inputText = event.target.value.toLowerCase();
    setSearchString(inputText);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const validateInputs = ({ name, email, role }) => {
    if (!name || !email || !role) {
      alert("Fill all fields before submitting!");
      return false;
    }
    return true;
  };

  const handleFromSubmit = (user, formFields) => {
    if (validateInputs(formFields)) {
      updateUser(user, formFields);
      setUserToEdit(null);
      setFormFields(defaultFormFields);
    }
  };

  const handleCancelEdit = () => {
    setUserToEdit(null);
    setFormFields(defaultFormFields);
  };

  const handleDeleteSelected = () => {
    setIsHeaderChecked(false);
    setSearchString("");
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
    deleteSelectedUsers();
  };

  const { name, email, role } = formFields;

  return (
    <div className="parent-container">
      <div className="search-bar">
        <input
          className="input-field"
          type="text"
          onChange={handleSearchBarChange}
          value={searchString}
          name="search"
          placeholder="Search by name, email or role"
        />
      </div>
      <div className="box-container">
        <div>
          <Header indicesRef={indicesRef} />
        </div>
        <div className="users-list">
          {filteredUsers.length ? (
            filteredUsers.slice(startIndex, endIndex).map((user) => {
              indicesRef.current.add(Number(user.id));
              return (
                <div>
                  <UserTile
                    key={user.id}
                    user={user}
                    setUserToEdit={setUserToEdit}
                    handleCancelEdit={handleCancelEdit}
                  />
                  {user.id === userToEdit ? (
                    <form className="form">
                      <div className="form-container">
                        <div className="from-input-container">
                          <label>Name:</label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="from-input-container">
                          <label>Email:</label>
                          <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="from-input-container">
                          <label>Role:</label>
                          <input
                            type="text"
                            name="role"
                            value={role}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-button-container">
                          <button onClick={handleCancelEdit}>Cancel</button>
                          <button
                            type="button"
                            onClick={() => handleFromSubmit(user, formFields)}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          ) : (
            <p className="empty-list">No record found</p>
          )}
        </div>
      </div>
      <div>
        <div className="footer">
          <button
            className="btn-main delete-selected-button"
            onClick={handleDeleteSelected}
          >
            DELETE SELECTED
          </button>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
            indicesRef={indicesRef}
          />
        </div>
      </div>
    </div>
  );
};
export default Directory;
