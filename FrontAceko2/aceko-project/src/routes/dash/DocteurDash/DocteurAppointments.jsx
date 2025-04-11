import React from 'react'
import Content from '../../../admin/Content';
import DoctorCalendar from '../../../Components/DoctorCalendar';

const DocteurAppointments = () => {
  return (
    <Content>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-4">
        <div className="bg-blue-300 py-4 px-6">
          <h2 className="text-xl font-bold text-gray-600">Mon Calendrier</h2>
        </div>
        <div className="p-4">
          <DoctorCalendar />
        </div>
      </div>
    </Content>
  );
}

export default DocteurAppointments