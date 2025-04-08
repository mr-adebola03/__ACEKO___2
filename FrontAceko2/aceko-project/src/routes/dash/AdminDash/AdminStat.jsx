import React, {  } from 'react'
import Content from '../../../admin/Content'
import Stats from '../../../Components/Stat/Stats'
import ListeDemande from './ListeDemande'


const AdminStat = () => {
  return (
    <Content>
      <Stats />
      <ListeDemande/>
    </Content>
  )
}

export default AdminStat