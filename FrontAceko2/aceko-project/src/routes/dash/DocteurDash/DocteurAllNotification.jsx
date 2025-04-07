import React from 'react'
import Content from '../../../admin/Content'
import NotifTable from '../../../Components/Tabs/NotifTable'

const DocteurAllNotification = () => {

    const columns = [
        {key:'id', label:'ID'},
        { key: 'type', label: 'Type' },
        { key: 'title', label: 'Title' },
        { key: 'message', label: 'Message' },
        {key:'actions',label:'Actions'}
    ]

    const notifications = [
        { id: 1, type: 'Alerte', title: 'Hausse taux du glucose', message: "L'on est forcé de constater la hause du taux de glucose du patient 002 qui pourrait etre dangereux pour cette derniere"},
        { id: 2, type: 'Info', title: 'Envoie résultats', message: "Les résultats d'examen du patient 003 sont à présent disponible veuillez bien vouloir les consulter" },
        { id: 3, type: 'Succes', title: 'Succés création dossier patient', message: 'Vous venez de creer un nouveau dossier patient. Ceci atteste de la réussite de la crétion du dossier' }
    ]

    return (
        <Content>
            <div className='px-4 font-semibold text-xl mb-4'>My Notification</div>
            <NotifTable thead={columns} tbody={notifications} show={true} />
        </Content>
    )
}

export default DocteurAllNotification