import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getEmployeesData } from '../../constants';
import Card from './Card';
import Balance from './Balance';

const Stats = () => {
  const [employeesData, setEmployeesData] = useState(getEmployeesData({}));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données en parallèle
        const [pendingResponse, approvedResponse] = await Promise.all([
          axios.get('http://localhost:8000/auth/admin/pending-approvals/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }),
          axios.get('http://localhost:8000/auth/admin/users-approvals/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          })
        ]);

        // Mettre à jour les données
        setEmployeesData(getEmployeesData({
          pending: pendingResponse.data.length,
          approved: approvedResponse.data.length,
          total: pendingResponse.data.length + approvedResponse.data.length
        }));
      } catch (error) {
        console.error('Erreur:', error);
        // En cas d'erreur, utiliser les valeurs par défaut
        setEmployeesData(getEmployeesData({}));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className='gap-5'>
      <div className="flex justify-between items-center gap-4 h-full">
        {employeesData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
      {/* <Balance /> */}
    </div>
  );
};

export default Stats;