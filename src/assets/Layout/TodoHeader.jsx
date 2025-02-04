import React from 'react'
import '../styles/todoHeader.css'
const TodoHeader = ({ theme, setTheme }) => {
  return (
    <div className='todoHeader' tabIndex={"0"}>
        <p className='todoText'>TODO</p>
        <img className='themeImage' alt='app theme' 
            src={ theme=='light' ? '/images/icon-moon.svg' : '/images/icon-sun.svg' } 
            onClick={() => ( theme=='light' ? setTheme('dark') : setTheme('light') )} />
    </div>
  )
}

export default TodoHeader