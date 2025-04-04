import React, { useEffect, useState } from 'react'
import Content from '../../../admin/Content'
import Table from '../../../Components/Tabs/Table'
import { FaEye } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListeDemande = () => {

  useEffect(() => {
    fetchPendingUsers()
  }, [])

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/admin/pending-approvals/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setUsers(response.data),
      setPendingCount(response.data.length)
    } catch (error) {
      toast.error('Erreur lors du chargement des demandes')
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {key:'id', label:'ID'},
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    {key:'actions',label:'Actions'}
  ]
  return (
    <Content>
      <div>ListeDemande ({pendingCount})</div>
      <Table 
        thead={columns} 
        tbody={users} 
        show={true}
        loading={loading}
        emptyMessage="Aucune demande en attente"
      />
    </Content>
  )
}

export default ListeDemande