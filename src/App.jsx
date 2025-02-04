import React, { useEffect, useState } from 'react'
import './App.css'
import TodoHeader from './assets/Layout/TodoHeader'
import TaskInput from './assets/Components/TaskInput'
import Tasks from './assets/Layout/Tasks'
const App = () => {

  const [theme, setTheme] = useState('light')
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectionType, setSelectionType] = useState('All')

  function saveToLocalStorage() {
    localStorage.setItem('_tasks', JSON.stringify(tasks))
  }

  useEffect(() => {
    let localTasks = JSON.parse(localStorage.getItem('_tasks'))
    if (localTasks instanceof Array) {
      localTasks = localTasks.map(task => {
        task.launched = true
        return task
      })/* 
      if (selectionType == 'Active') {
        localTasks = localTasks.filter(task => !(task.completed))
      }
      else if (selectionType == 'Completed') {
        localTasks = localTasks.filter(task => task.completed)
      } */
      setTasks(localTasks)
    }
  }, [ ])

  useEffect(() => {
    if ((tasks instanceof Array) && (tasks.length)) {
      saveToLocalStorage()
    }
  }, [tasks])

  const addToTask = (selectedTask) => {
    setTasks(prev => {
      const newTasks = []
      let found = false
      prev.map((task, index) => {
        if (task.id == selectedTask.id) {
          found = true
          newTasks.push(selectedTask)
          return
        }
        else {
          if (task.id != selectedTask.id) {
            newTasks.push(task)
          }
          if ((index == prev.length - 1) && (task.id != selectedTask.id) && (!found)) {
            newTasks.push(selectedTask) // has to return the last two items in the list
          }
        }
      })
      return newTasks
    })
  }
  const cancelFunction = (taskid) => {
    const newTasks = []
    tasks.map(task => {
      if (!(task.id == taskid)) {
        newTasks.push(task)
      }
    })
    setTasks(newTasks)
  }
  function clearCompleted() {
    if (tasks) {
      const newTasks = tasks.filter(task => !task.completed)
      setTasks(newTasks)
      if (!(newTasks.find(task => !task.completed))) {
        alert('Nothing to clear')
      }
    }
    else {
      alert('Nothing to clear')
    }
  }
  function keyListen() {
    window.addEventListener('keypress', (e) => {
      if(e.code == 'Enter') {
        document.getElementById('taskinputid').focus()
      }
    })
  }
  keyListen()
  return (
    <div className={`mainAppWrapper ${theme}`}>
      <div className='topContainer'>
        {/* contains nothing other than the background image */}
      </div>
      <div className='restContainer'>
        {/* contains the rest of the todolist app */}
        <div className='todoWrapper'>
          <TodoHeader theme={theme} setTheme={setTheme} />
          <TaskInput addToTask={addToTask} tasks={tasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
          <Tasks clearCompleted={clearCompleted} saveFunction={saveToLocalStorage} cancelFunction={cancelFunction} tasks={tasks} setSelectedTask={setSelectedTask} show={selectionType}/>
          <div className='specialSelection'>
            <p className={`specialSelectionOption ${ (selectionType=='All' ? 'selected' : '')}`} onClick={(e) => {setSelectionType(e.target.innerText)}}>All</p>
            <p className={`specialSelectionOption ${ (selectionType=='Active' ? 'selected' : '')}`} onClick={(e) => setSelectionType(e.target.innerText)}>Active</p>
            <p className={`specialSelectionOption ${ (selectionType=='Completed' ? 'selected' : '')}`} onClick={(e) => setSelectionType(e.target.innerText)}>Completed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App