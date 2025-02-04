import React, { useEffect, useState } from 'react'

const Check = ({ task, tasks, saveFunction, setTask, setTrigger }) => {
    const [status, setStatus] = useState(task ? task.completed : false)
    useEffect(() => {
      if (task) {
        setStatus(task.completed)
      }
    }, [task])

    useEffect(() => {
      if (!task) {
        setStatus(false)
      }
    }, [tasks])

    useEffect(() => {
      if (task && task.launched) {
        if (setTask) {
          setTask(task)
        }
        if (setTrigger) {
          setTrigger(prev => ++prev)
        }
      }
    }, [ status ])

    const mark = () => {
      task.completed = !(task.completed)
      setStatus(task.completed)
      setTask(task)
      saveFunction()
    }
  return (
    <>
        <label htmlFor={task ? task.id.toString() : 'taskinputcheckid'} 
          className={'ring ' + ((status) ? 'completed' : '')}
          tabIndex={"0"}
          onClick={ task ? mark : null}>
            {(status) ? <img alt='checker' src='/images/icon-check.svg' /> : null}
        </label>
        <input id={task ? task.id.toString() : 'taskinputcheckid'} type='checkbox'  style={{ display: 'none'}}/>{/* task does not exist for task input and so is undefined so it doesn't work for that case */}
    </>
  )
}

export default Check