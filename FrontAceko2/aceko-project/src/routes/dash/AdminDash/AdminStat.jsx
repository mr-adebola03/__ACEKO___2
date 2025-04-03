import React from 'react'
import Content from '../../../admin/Content'
import Stats from '../../../Components/Stat/Stats'


const AdminStat = ({darkMode}) => {
  return (
    <Content>
      <Stats darkMode={darkMode}/>
      <div className='flex flex-col gaap-3 lg:flex-row'>
        
      </div>
    </Content>
  )
}

export default AdminStat