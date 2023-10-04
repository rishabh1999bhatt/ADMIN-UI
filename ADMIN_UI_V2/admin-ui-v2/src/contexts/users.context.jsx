import { useState, useEffect, createContext } from "react";
import axios from "axios";

import { config } from "../App";

export const UsersContext = createContext({
  users: [],
  setUsers: () => {},
  isHeaderChecked: false,
  setIsHeaderChecked: () => {},
  updateUser: () => {},
  deleteSingleUser: () => {},
  selectedUsersMap: {},
  setSelectedUsersMap: () => {},
});

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const [selectedUsersMap, setSelectedUsersMap] = useState(new Map());

  const deleteSingleUser = (userToDelete) => {
    const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
    setUsers(updatedUsers);
  };

  const updateUser = (userToUpdate, formFields) => {
    const { name, email, role } = formFields;
    const updatedUsers = users.map((user) => {
      return user.id === userToUpdate.id
        ? { id: user.id, name, email, role }
        : user;
    });
    setUsers(updatedUsers);
  };

  const deleteSelectedUsers = () => {
    const updatedUsers = users.filter((user) => !selectedUsersMap.has(user.id));
    setUsers(updatedUsers);
  };

  const value = {
    users,
    setUsers,
    updateUser,
    deleteSingleUser,
    isHeaderChecked,
    setIsHeaderChecked,
    deleteSelectedUsers,
    selectedUsersMap,
    setSelectedUsersMap,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(config.endpoint);
        setUsers(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
