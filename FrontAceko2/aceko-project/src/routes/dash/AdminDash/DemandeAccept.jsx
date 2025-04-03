import React from 'react'
import Content from '../../../admin/Content'
import Table from '../../../Components/Tabs/Table'

const DemandeAccept = () => {

  const users = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo',email: 'Otto@gmail.com', poste: 'Docteur'},
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat',email: 'thornton@gmail.com', poste: 'Docteur' },
    { id: 3, firstName: 'Larry', lastName: 'the Bird', username: '@twitter',email: 'larry@gmail.com', poste: 'Laborantin' }
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
      <div>Demande Approuvée</div>
      <Table thead={columns} tbody={users} />
    </Content>
  )
}

export default DemandeAccept