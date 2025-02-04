import React from 'react'

const Cancel = ( {cancelFunction, task} ) => {
  return (
    <div>
        <img className='cancelImage' alt='cancel task' src='/images/icon-cross.svg' onClick={() => cancelFunction(task.id)}/>
    </div>
  )
}

export default Cancel