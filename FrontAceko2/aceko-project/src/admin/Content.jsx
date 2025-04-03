import React from 'react'

const Content = ({children}) => {
  return (
    <div className='flex-1 flex-col flex gap-5'>{children}</div>
  )
}

export default Content