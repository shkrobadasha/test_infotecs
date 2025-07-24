import React from "react"
import { useState } from "react"
//сколько отображаем на странице в данный момент
const LIMIT = 10;


//totalUsersCount, pageSize, CurrentPage, onPageChanged
//здесь будут отрисовываться кнопочки-страницы
//кнопочки туда-сюда 
//нужная часть пользователей? (должен заново создаваться запрос на сервер с указанием скипа)
//fetch('https://dummyjson.com/users?limit=5&skip=10&select=firstName,age')

const Paginator = () => {
    
    const [currentPartOfData, setCurrentPartOfData] = useState(0)
    let pageCount = Math.ceil(totalUsersCount/pageSize)


    //const pages = Array.from((Array(pageCount).keys()))
    //console.log(pages[2])
    return (
        <div>pages</div>
    )


}

export default Paginator