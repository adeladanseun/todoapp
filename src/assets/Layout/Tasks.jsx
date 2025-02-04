import { useEffect, useState } from 'react'
import '../styles/tasks.css'
import Task from '../Components/Task'

const Tasks = ({ tasks, setSelectedTask, cancelFunction, saveFunction, show, clearCompleted }) => {
  const [incomplete, setIncomplete] = useState()
  const [ trigger, setTrigger ] = useState(0)
  /* function completionCount */useEffect(() => /* { */(
    /* return ( */
      setIncomplete(tasks ?
            (tasks.filter(
              task => !task.completed
            ).length - (
                tasks.find(
                  task => parseInt(task.id) == 0) ?
                  1 :
                  0)) :
            0
    /* ) */
  /* } */)), [ tasks, trigger ])
  function setIncompleteCount() {
    setIncomplete(completionCount())
  }
  return (
    <div className='tasks'>
      {
        tasks ?
          tasks.map(task => {
            return (
              parseInt(task.id) == 0 ?
                null :
                <Task saveFunction={saveFunction}
                  setSelectedTask={setSelectedTask} task={task}
                  tasks={tasks} cancelFunction={cancelFunction}
                  key={task.id} setTrigger={setTrigger} show={show}/>)
          })
          : <Task task={null} />
      }
      <div className='endTaskSection'>
        <p className='itemCount'> { incomplete } item{ incomplete ? (incomplete > 1 ? 's' : '') : ''} left</p>
        <p className={'clearCompleted' + (tasks ? (tasks.some((task) => task.completed) ? '' : 'inactive') : '')}
         onClick={clearCompleted}>Clear Completed</p>
      </div>
    </div>
  )
}

export default Tasks