import React, { useState } from 'react'
import SideBar3 from '../../Components/Bar/SideBar3'
import DocteurHeader from '../../Components/Bar/DocteurHeader'
import DocMain from '../../Docteur/DocMain'
import { Routes,Route } from 'react-router-dom'
import DocteurDashboard from './DocteurDash/DocteurDashboard'
import DocteurDossier from './DocteurDash/DocteurDossier'
import DocteurListPatient from './DocteurDash/DocteurListPatient'
import DocteurAppointments from './DocteurDash/DocteurAppointments'
import DocteurNotificationSpecial from './DocteurDash/DocteurNotificationSpecial'
import DocteurAllNotification from './DocteurDash/DocteurAllNotification'
import DocteurProfile from './DocteurDash/DocteurProfile'
import PatientProfil from './DocteurDash/Patient/PatientProfil'
import HistoriqueConsultation from './DocteurDash/Patient/HistoriqueConsultation'
import ResultatsAnalyses from './DocteurDash/Patient/ResultatsAnalyses'
import DonneMedical from './DocteurDash/Patient/DonneMedical'
import PatientConsultation from './DocteurDash/Patient/PatientConsultation'
import ShowPatientAnalyse from './DocteurDash/Patient/ShowPatientAnalyse'
import AddNewConsultation from './DocteurDash/Patient/AddNewConsultation'
import ListeAntecedentsMedicaux from './DocteurDash/Patient/ListeAntecedentsMedicaux'
import ListeAnalyse from './DocteurDash/Patient/ListeAnalyse'
import ListeTraitementsEnCours from './DocteurDash/Patient/ListeTraitementsEnCours'
import ShowPatientTraitment from './DocteurDash/Patient/ShowPatientTraitment'
import AddNewAnalyseResultat from './DocteurDash/Patient/AddNewAnalyseResultat'
import AddNewAntecedent from './DocteurDash/Patient/AddNewAntecedent'
import ShowAntecedent from './DocteurDash/Patient/ShowAntecedent'
import AddNewAnalyse from './DocteurDash/Patient/AddNewAnalyse'
import ShowAnalyse from './DocteurDash/Patient/ShowAnalyse'
import SuiviMedical from './DocteurDash/Patient/SuiviMedical'
import AddNewTraitment from './DocteurDash/Patient/AddNewTraitment'
import WorkflowDashboard from './WorkFlow/WorkflowDashboard'
import AddWorkflow from './WorkFlow/AddWorkflow'
import ShowWorkflow from './WorkFlow/ShowWorkflow'
import AddTask from './WorkFlow/Task/AddTask'
import TaskDashboard from './WorkFlow/Task/TaskDashboard'

const DocteurDash = () => {

    const [isSidebarOpen,setIsSidebarOpen] = useState(false)
    const toogleSidebar = ()=>{
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className='bg-slate-200  w-screen h-screen'>
            <DocteurHeader toogleSidebar={toogleSidebar} isMenuOpen={isSidebarOpen} />
            <SideBar3 isSidebarOpen={isSidebarOpen}/>
            <DocMain>
                <Routes>
                    <Route path='/dashboard' element={<DocteurDashboard/>} />
                    <Route path='/create-patient-document' element={<DocteurDossier/>} />
                    <Route path='/all-patients' element={<DocteurListPatient/>} />
                    <Route path='/my-appointments' element={<DocteurAppointments/>} />
                    <Route path='/notification' element={<DocteurNotificationSpecial/>} />
                    <Route path='/all-notification' element={<DocteurAllNotification/>} />
                    <Route path='/my-profile' element={<DocteurProfile/>} />
                    <Route path='/patient-profile/:id' element={<PatientProfil/>} />
                    <Route path='/patient-historique-consultation' element={<HistoriqueConsultation/>} />
                    <Route path='/patient-donne-medical' element={<DonneMedical/>} />
                    <Route path='/patient-resultats-analyse' element={<ResultatsAnalyses/>} />
                    <Route path='/patient-historique-consultation/consultation/' element={<PatientConsultation/>}/>
                    <Route path='/patient-resultats-analyse/show-patient-analyse/' element={<ShowPatientAnalyse/>}/>
                    <Route path='/patient-historique-consultation/create-new-consultation/' element={<AddNewConsultation/>}/>
                    <Route path='/patient-donne-medical/antecedants' element={<ListeAntecedentsMedicaux/>}/>
                    <Route path='/patient-donne-medical/analyse' element={<ListeAnalyse/>}/>
                    <Route path='/patient-donne-medical/traitements-en-cours' element={<ListeTraitementsEnCours/>}/>
                    <Route path='/patient-donne-medical/traitements-en-cours/show-traitement-info' element={<ShowPatientTraitment/>}/>
                    <Route path='/patient-resultats-analyse/create-new-analyse-resultat' element={<AddNewAnalyseResultat/>} />
                    <Route path='/patient-donne-medical/antecedants/new-antecedent' element={<AddNewAntecedent/>} />
                    <Route path='/patient-donne-medical/antecedants/show' element={<ShowAntecedent/>} />
                    <Route path='/patient-donne-medical/analyse/new-analyse' element={<AddNewAnalyse/>} />
                    <Route path='/patient-donne-medical/analyse/show-analyse' element={<ShowAnalyse/>} />
                    <Route path='/patient-suivi-medical' element={<SuiviMedical/>} />
                    <Route path='/patient-donne-medical/traitements-en-cours/new-traitment' element={<AddNewTraitment/>} />
                    <Route path='/workflow' element={<WorkflowDashboard/>} />
                    <Route path='/workflow/new-workflow' element={<AddWorkflow/>} />
                    <Route path='/workflow/show-workflow/:id' element={<ShowWorkflow/>} />
                    <Route path='/workflow/task' element={<TaskDashboard/>} />
                    <Route path='/workflow/add-task' element={<AddTask/>} />
                </Routes>
            </DocMain>
        </div>
        
    )
}

export default DocteurDash