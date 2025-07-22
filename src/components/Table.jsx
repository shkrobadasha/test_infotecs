import React, { useEffect, useState } from "react"

const Table = () => {
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
            console.log(data.users)
        } catch (error){
            console.log(`Failed to complete the request: ${error.message}`)
        }
    }

    useEffect(()=> {
        getUserData()
    }, [])

    return (
        <table className = 'table without style'> 
            <thead>
                <tr>
                    <th onClick = {() => sortHandler('lastName')} >Фамилия</th>
                    <th onClick = {() => sortHandler('firstName')}>Имя</th>
                    <th onClick = {() => sortHandler('middleName')}>Отчество</th>
                    <th onClick = {() => sortHandler('age')}>Возраст</th>
                    <th onClick = {() => sortHandler('gender')}>Пол</th>
                    <th onClick = {() => sortHandler('phone')}>Номер телефона</th>
                    <th>Email</th>
                    <th>Страна</th>
                    <th>Город</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.lastName}</td>
                        <td>{user.firstName}</td>
                        <td>{user.middleName}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.address.country}</td>
                        <td>{user.address.city}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}

export default Table