import React from 'react'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import NotifTabsRows from './NotifTabsRows';

const NotifTable = ({ thead, tbody,show=false }) => { 
    return (
        <div class="table-responsive">
            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th><MdCheckBoxOutlineBlank/></th>
                        {thead
                        .filter(col => col.key !== 'id' && col.key !== 'actions') 
                        .map((value) => (
                            <th scope="col" key={value.key}>
                                {value.label}
                            </th>
                        ))}
                        {show && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {tbody.map((body, index) => (
                        <NotifTabsRows showEye={show} key={body.id} data={body} index={index} columns={thead} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default NotifTable