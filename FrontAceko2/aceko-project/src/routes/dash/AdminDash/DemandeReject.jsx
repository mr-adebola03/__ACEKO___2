import React from 'react'
import Content from '../../../admin/Content'
import Table from '../../../Components/Tabs/Table'

const DemandeReject = () => {

  const users = [
    { id: 1, firstName: 'Mark', lastName: 'Jean', username: '@marJ',email: 'mark@gmail.com', poste: 'Docteur'},
    { id: 2, firstName: 'Jack', lastName: 'Thornton', username: '@JacTh',email: 'jack@gmail.com', poste: 'Laborantin' },
    { id: 3, firstName: 'Larson', lastName: 'Bird', username: '@LasBir',email: 'larson@gmail.com', poste: 'Laborantin' }
  ]

  const columns = [
    {key:'id', label:'ID'},
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'username', label: 'Username' },
    {key:'email',label:'Actions'},
    { key: 'poste', label: 'Poste' },
  ]

  return (
    <Content>
      <div>Demande rejeté</div>
      <Table thead={columns} tbody={users} />
    </Content>
  )
}

export default DemandeReject