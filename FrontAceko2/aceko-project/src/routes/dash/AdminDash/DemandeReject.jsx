import React, { useEffect, useState } from 'react'
import Content from '../../../admin/Content'
import Table from '../../../Components/Tabs/Table'
import axios from 'axios'
import { toast } from 'react-toastify'

const RejectedUsersList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRejectedUsers()
  }, [])

  const fetchRejectedUsers = async () => {
    try {
      const response = await axios.get('https://aceko.onrender.com/auth/admin/users/rejected/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setUsers(response.data)
    } catch (error) {
      toast.error('Erreur lors du chargement des utilisateurs rejetés')
      console.log('Détails:', error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'first_name', label: 'Prénom' },
    { key: 'last_name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { 
      key: 'rejection_date', 
      label: 'Date de rejet',
      render: (item) => new Date(item.rejection_date).toLocaleDateString()
    },
    { 
      key: 'rejection_reason', 
      label: 'Raison du rejet',
      render: (item) => item.rejection_reason || 'Non spécifiée'
    }
  ]

  return (
    <Content>
      <div className='mb-2 px-1'>Liste des utilisateurs rejetés ({users.length})</div>
      <Table 
        thead={columns} 
        tbody={users} 
        loading={loading}
        emptyMessage="Aucun utilisateur rejeté"
      />
    </Content>
  )
}

export default RejectedUsersList