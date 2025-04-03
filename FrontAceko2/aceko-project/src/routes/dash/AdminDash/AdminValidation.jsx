import React from 'react'
import { Input } from '../../../Components/Input'
import Content from '../../../admin/Content'

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
        <div>AdminValidation</div>
        <div className='flex flex-col gap-3 lg:flex-row'>
        <form action="">
            <h1 className='mb-3'>Validation Informations</h1>
            <div className="col">
                <div className="row mb-2">
                    <Input label={"email"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.email} value={uservalue.email}  />
                </div>
                <div className="row mb-2">
                    <Input label={"First name"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.first_name} value={uservalue.first_name}  />
                </div>
            </div>
            <div className="col">
                <div className="row mb-2">
                    <Input label={"email"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.email} value={uservalue.email}  />
                </div>
                <div className="row mb-2">
                    <Input label={"First name"} icon={<i className="fa-regular fa-envelope"></i>} placeholder={uservalue.first_name} value={uservalue.first_name}  />
                </div>
            </div>
        </form>
        </div>
    </Content>
  )
}

export default AdminValidation