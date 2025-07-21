import React, { useEffect, useState } from "react"

const Table = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(false)

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
        <table className = 'table without style'> 
            <thead>
                <tr>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Возраст</th>
                    <th>Пол</th>
                    <th>Номер телефона</th>
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