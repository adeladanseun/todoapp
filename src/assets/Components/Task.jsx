import React, { useState } from 'react'
import Check from './Check'
import '../styles/tasks.css'
import Cancel from './Cancel'

const Task = ({ task, setSelectedTask, tasks, cancelFunction, show, saveFunction, setTrigger }) => {
  const [taskState, setTask] = useState(task)
  return (
    <div className={'task ' + (
      show ? 
        ((show=='Active' && (task ? !task.completed : '')) ? 
           '' : 
            (show=='Completed' && (task ? task.completed : '') ? 
              '' :
              (show=='All' ? '' : 'hide'))
          ) : 
        '')} >
      {task ? <Check task={ taskState } tasks={tasks} setTask={setTask} saveFunction={saveFunction} setTrigger={setTrigger}/> : <div></div>}
      <p className={`taskText ${ taskState ? taskState.completed : '' }`} onClick={ taskState ? (() => setSelectedTask(taskState)) : null}>{ taskState ? taskState.task : 'No Task to Display'}</p>
      { taskState ? <Cancel cancelFunction={cancelFunction} task={taskState}/> : <div></div>}
    </div>
  )
}

export default Task