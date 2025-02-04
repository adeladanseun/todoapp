import React, { useState, useEffect } from 'react'
import '../styles/todoInput.css'
import Check from './Check'
const TaskInput = ({ selectedTask, setSelectedTask, addToTask, tasks }) => {

  const [inputValue, setInputValue] = useState(selectedTask ? selectedTask.task : '')
  useEffect(() => {
    if (selectedTask) {
      setInputValue(selectedTask.task)
    } else {
      setInputValue('')
    }
  }, [selectedTask])
  function createTask(text) {
    const newTask = {
      "task": text,
      "id": new Date().getTime(),
      "completed": false,
      "date_created": new Date().toString()
    }
    return newTask
  }
  return (
    <div className='taskInputWrapper' id={"taskInputWrapper"} tabIndex={"0"}>
      <form onSubmit={
        (e) => {
          e.preventDefault()
          if (selectedTask && inputValue) {
            selectedTask.task = inputValue
            addToTask(selectedTask)
          } else {
            alert('invalid submission')
          }
          setSelectedTask(null)
          setInputValue('')
        }
      }>
        <Check task={selectedTask} tasks={tasks}/>
        <input placeholder='Create a new Todo' name='taskinput'
          value={inputValue}
          id={"taskinputid"}
          onChange={(e) => {
            setInputValue(e.target.value)
            if (!(e.target.value) && (selectedTask)) {
              setSelectedTask(null)
            }
            if ((e.target.value) && !(selectedTask)) {
              const newTask = createTask(e.target.value)
              setSelectedTask(newTask)
            }
          }} onFocus={(e) => {
            if (!inputValue && selectedTask) {
              setInputValue(selectedTask.task)
            }
          }} />
        <input type='submit' className='inputSubmit' value='Submit'/>
      </form>
    </div>
  )
}

export default TaskInput