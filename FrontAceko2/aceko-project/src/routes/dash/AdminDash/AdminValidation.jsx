import React from 'react'
import { Input } from '../../../Components/Input'
import Content from '../../../admin/Content'
import PhotoPatient from '../../../assets/user02.png'

const AdminValidation = () => {
    const uservalue = {
        email: "jean@",
        first_name : "Jean",
        last_name : "DuPont",
        username : "jean@du2",
        date_naissance : "20/12/1998",
        phone_number : "0154789054",
        agents_sante : "Docteur",
        numero_licence_medicale : "",
        photo_profil : "",
        civilte : "M"
    }
  return (
    
    <Content>
        <h1 className='font-semibold text-gray-500 text-xl '>Validation demande d'inscription</h1>
        <div className=" bg-white px-3 py-5 rounded-xl flex flex-col">
            <div className="flex py-2 px-4 mb-2">
                <img src="" alt="Photo medecin" className='w-36 h-36 mr-5 p-2 rounded-sm bg-gray-500' />
                <div className='flex flex-col p-1 w-[70%]'>
                    <h3 className='mb-2 text-xl flex justify-between items-baseline w-full'>First name : <span className='font-semibold text-gray-500'>{uservalue.first_name}</span></h3>
                    <h3 className='mb-2 text-xl flex justify-between items-baseline w-full'>Last name : <span className='font-semibold text-gray-500'>{uservalue.last_name}</span></h3>
                    <h3 className='mb-2 text-xl flex justify-between items-baseline w-full'>Civilite : <span className='font-semibold text-gray-500'>{uservalue.civilte}</span></h3>
                    <h3 className='mb-2 text-xl flex justify-between items-baseline w-full'>Profession : <span className='font-semibold text-gray-500'>{uservalue.agents_sante}</span></h3>
                </div>
            </div>
            <div className="row px-4">
                <div className="col mb-2">
                    < Input label={"Email"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.email} value={uservalue.email}  />
                </div>
                <div className="col mb-2">
                    <Input label={"Phone number"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.phone_number} value={uservalue.phone_number}  />
                </div>
            </div>
            <div className="col mb-2 px-4">
                < Input label={"Numero de licence medicale"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.numero_licence_medicale} value={uservalue.numero_licence_medicale}  />
            </div>
            <div className="col mb-4 px-4">
                < Input label={"Date de Naissance"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.date_naissance} value={uservalue.date_naissance}  />
            </div>
            <form action="">
                <div className="mt-2 flex items-center justify-center">
                    <div className="mr-5">
                        <button className='bg-blue-500 text-xl text-slate-100 font-semibold py-2 px-4 text-center rounded-lg'>Accepter</button>
                    </div>
                    <div className="">
                        <button className='bg-red-500 text-xl text-slate-100 font-semibold py-2 px-4 text-center rounded-lg'>Accepter</button>
                    </div>
                </div>
            </form>
        </div>
        
        <div className='flex flex-col gap-3 lg:flex-row'>
        
        </div>
    </Content>
  )
}

export default AdminValidation