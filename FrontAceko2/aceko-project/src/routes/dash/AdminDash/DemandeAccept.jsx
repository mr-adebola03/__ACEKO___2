import React, {useState, useEffect } from 'react'
import Content from '../../../admin/Content'
import Table from '../../../Components/Tabs/Table'
import axios from 'axios'
import { toast } from 'react-toastify'

const DemandeAccept = () => {

  useEffect(() => {
    fetchPendingUsers()
  }, [])

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminpendingCount, setAdminPendingCount] = useState(0);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/admin/users-approvals/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setUsers(response.data),
      setAdminPendingCount(response.data.length)
    } catch (error) {
      toast.error('Erreur lors du chargement des demandes')
      console.log('Détails:', error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {key:'id', label:'ID'},
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    {key:'email',label:'Actions'},
    { key: 'agents_sante', label: 'Poste' },
  ]

  return (
    <Content>
      <div>Demande Approuvée({adminpendingCount})</div>
      <Table 
        thead={columns} 
        tbody={users} 
        show={true}
        loading={loading}
        emptyMessage="Aucune demande accepté"
      />
    </Content>
  )
}

export default DemandeAccept