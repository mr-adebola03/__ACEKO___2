import React from 'react'
import Content from '../../../admin/Content'
import Table from '../../../Components/Tabs/Table'
import { FaEye } from 'react-icons/fa'

const ListeDemande = () => {
  const users = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo'},
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat' },
    { id: 3, firstName: 'Larry', lastName: 'the Bird', username: '@twitter' }
  ]

  const columns = [
    {key:'id', label:'ID'},
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'username', label: 'Username' },
    {key:'actions',label:'Actions'}
  ]
  return (
    <Content>
      <div>ListeDemande</div>
      <Table thead={columns} tbody={users} show={true} />
    </Content>
  )
}

export default ListeDemande