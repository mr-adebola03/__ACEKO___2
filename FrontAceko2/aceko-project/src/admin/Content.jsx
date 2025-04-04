import React from 'react'

const Content = ({children}) => {
  return (
    <div className='flex-1 flex-col flex gap-4'>{children}</div>
  )
}

export default Content