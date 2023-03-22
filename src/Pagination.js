import React from 'react'
import { useGlobalContext } from './context'

const Pagination = () => {
  const { page, nbPages, handleNext, handlePrev } = useGlobalContext()


  return (
    <>
      <div className='pagination-btn'>
        <button id='btn1' onClick={handlePrev}>PREV</button>
        <p>
          {page + 1} of {nbPages}
        </p>
        <button id='btn1' onClick={handleNext}>NEXT</button>
      </div>
    </>
  )
}

export default Pagination