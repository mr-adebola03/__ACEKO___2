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

    }
  return (
    
    <Content>
        <h1 className='font-semibold text-gray-500 text-xl '>Validation demande d'inscription</h1>
        <div className=" bg-white px-3 py-5 rounded-xl">
            <div className="flex items-center justify-between">
                <img src="" alt="Photo medecin" className='w-10 h-10 p-3 rounded-full bg-gray-500' />
                <div className='flex flex-col '>
                    <h3>First name : </h3>
                    <h3>Last name : </h3>
                </div>
            </div>
            <form action="">
                <div className="row">
                    <div className="col mb-2">
                        <Input label={"email"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.email} value={uservalue.email}  />
                    </div>
                    <div className="col mb-2">
                        <Input label={"First name"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.first_name} value={uservalue.first_name}  />
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