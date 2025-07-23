import React from "react";
import Table from "./components/Table";
import ModalWindow from "./components/ModalWindow";
import { useState } from "react";

const App = () => {
  const [isOpen, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(false)

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseWindow = () => {
    setSelectedUser(null);
    setOpen(false);
  }


  return (
    <div className="App">
      <Table hadleWindow = {handleRowClick}/>
      <ModalWindow isOpen={isOpen} onClose ={() => handleCloseWindow()} user = {selectedUser}/>
    </div>
  );
}

export default App;
