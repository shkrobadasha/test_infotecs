import React, { useEffect, useState } from "react"
import styled from 'styled-components'

//нудно понять, куда запихивать modalWindow


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

const Table = ({hadleWindow}) => {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(false)
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
            //desc
            url = `https://dummyjson.com/users?sortBy=${sortParametr}&order=desc`
            break
            default: 
                url = `https://dummyjson.com/users`
                break
        }
        
        try{
            const response = await fetch(url)
            setLoading(true)
            if(!response.ok){
                throw new Error(`HTTP error: ${response.status}`)
            }
            const sortData = await response.json()
            setLoading(false)
            setUsers(sortData.users)

        } catch (error) {
            console.log(`Failed to complete the request: ${error.message}`)
        }
    }

    const getUserData = async () => {

        try {
            const response = await fetch('https://dummyjson.com/users')
            setLoading(true)
            if(!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            }
            const data = await response.json()
            setLoading(false)
            setUsers(data.users)
        } catch (error){
            console.log(`Failed to complete the request: ${error.message}`)
        }
    }

    useEffect(()=> {
        getUserData()
    }, [])

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
                    {users.map(user => (
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