import React from "react";
import Table from "./components/Table";
import ModalWindow from "./components/ModalWindow";
import Paginator from "./components/Paginator";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsers } from "./slices/userSlice.js";

//может тогда в эпп делать запрос на пользователей в юсэффекте
const URL = 'https://dummyjson.com/users'

const App = () => {
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(false)

   const getUserData = async () => {
          try {
              const response = await fetch(URL)
              if(!response.ok) {
                  throw new Error(`HTTP error: ${response.status}`)
              }
              const data = await response.json()
              dispatch(setUsers(data.users))
          } catch (error){
              console.log(`Failed to complete the request: ${error.message}`)
          }
      }
  
      useEffect(()=> {
          getUserData()
      }, [])

  return (
    <div className="App">
      <Table />
      <ModalWindow />
      <Paginator />
    </div>
  );
}

export default App;
