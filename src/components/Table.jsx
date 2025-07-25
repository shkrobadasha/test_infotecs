import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUsers } from "../slices/userSlice"
import { setSelectedUser, setOpenWindow } from "../slices/modalWindowSlice"
import styled from 'styled-components'


const MyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`
const TableWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: auto;
`
const Th = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
`

const Table = () => {
    const dispatch = useDispatch();
    const currentUsers = useSelector(state => state.users.usersData)

    const hadleWindow = (user) => {
        dispatch(setSelectedUser(user));
        dispatch(setOpenWindow(true));
    }

    const [sortConfig, setSortConfig] = useState({sortByfirstName: 1, 
        sortBymiddleName: 1,
        sortBylastName: 1,
        sortByage:1,
        sortBygender: 1,
        sortByphone: 1,
    })

    const sortHandler = async (sortParametr) => {
        let sort = sortConfig[`sortBy${sortParametr}`]
        setSortConfig({...sortConfig, [`sortBy${sortParametr}`]: sort < 2 ? sort+= 1: sort-= 2})

        let url
        switch (sortConfig[`sortBy${sortParametr}`]){
            case 0:
                url = `https://dummyjson.com/users`
                break
            case 1: 
                url = `https://dummyjson.com/users?sortBy=${sortParametr}&order=asc`
                break
            case 2: 
            url = `https://dummyjson.com/users?sortBy=${sortParametr}&order=desc`
            break
            default: 
                url = `https://dummyjson.com/users`
                break
        }
        
        try{
            const response = await fetch(url)
            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`)
            }
            const sortData = await response.json()
            dispatch(setUsers(sortData.users))

        } catch (error) {
            console.log(`Failed to complete the request: ${error.message}`)
        }
    }

    return (
        <TableWrapper>
            <MyTable> 
                <thead>
                    <tr>
                        <Th onClick = {() => sortHandler('lastName')} >Фамилия</Th>
                        <Th onClick = {() => sortHandler('firstName')}>Имя</Th>
                        <Th onClick = {() => sortHandler('middleName')}>Отчество</Th>
                        <Th onClick = {() => sortHandler('age')}>Возраст</Th>
                        <Th onClick = {() => sortHandler('gender')}>Пол</Th>
                        <Th onClick = {() => sortHandler('phone')}>Номер телефона</Th>
                        <Th>Email</Th>
                        <Th>Страна</Th>
                        <Th>Город</Th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id} onClick = {() => hadleWindow(user)}>
                            <Td>{user.lastName}</Td>
                            <Td>{user.firstName}</Td>
                            <Td>{user.middleName}</Td>
                            <Td>{user.age}</Td>
                            <Td>{user.gender}</Td>
                            <Td>{user.phone}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.address.country}</Td>
                            <Td>{user.address.city}</Td>
                        </tr>
                    ))}
                </tbody>
            </MyTable>
        </TableWrapper>   
    )
}

export default Table