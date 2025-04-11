import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Ajoutez ce composant dans votre fichier PatientProfil.js
const MedicalChartsSection = ({ patientId }) => {
  const medicalData = {
    bloodPressure: [120, 125, 118, 130, 122],
    heartRate: [72, 75, 70, 68, 74],
    weight: [68, 67, 67, 66, 65],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden mt-6'>
      <div className='bg-blue-300 py-4 px-6'>
        <h2 className='text-xl font-bold text-gray-600'>Suivi Médical</h2>
      </div>
      
      <div className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Graphique Pression Artérielle */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold mb-3 text-gray-700'>Pression Artérielle (mmHg)</h3>
            <Line 
              data={{
                labels: medicalData.labels,
                datasets: [{
                  label: 'Pression systolique',
                  data: medicalData.bloodPressure,
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.3
                }]
              }}
              options={chartOptions}
            />
          </div>

          <div className='bg-gray-50 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold mb-3 text-gray-700'>Fréquence Cardiaque (bpm)</h3>
            <Line 
              data={{
                labels: medicalData.labels,
                datasets: [{
                  label: 'Battements par minute',
                  data: medicalData.heartRate,
                  borderColor: 'rgb(239, 68, 68)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  tension: 0.3
                }]
              }}
              options={chartOptions}
            />
          </div>

          <div className='bg-gray-50 p-4 rounded-lg md:col-span-2'>
            <h3 className='text-lg font-semibold mb-3 text-gray-700'>Évolution du Poids (kg)</h3>
            <Line 
              data={{
                labels: medicalData.labels,
                datasets: [{
                  label: 'Poids',
                  data: medicalData.weight,
                  borderColor: 'rgb(16, 185, 129)',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  tension: 0.3
                }]
              }}
              options={{
                ...chartOptions,
                scales: {
                  y: {
                    min: Math.min(...medicalData.weight) - 2,
                    max: Math.max(...medicalData.weight) + 2
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalChartsSection;