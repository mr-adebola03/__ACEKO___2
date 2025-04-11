import React, {  } from 'react'
import MedicalChartsSection from '../../../../Components/MedicalChartsSection'
import Content from '../../../../admin/Content'
import PatientHeader from '../../../../Components/Bar/PatientHeader'


const SuiviMedical = () => {
  return (
    <Content>
        <PatientHeader/>
      <MedicalChartsSection/>
    </Content>
  )
}

export default SuiviMedical