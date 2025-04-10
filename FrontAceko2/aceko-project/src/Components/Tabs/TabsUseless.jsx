import React from 'react'
import TabsRowsUseless from './TabsRowsUseless'

const TabsUseless = ({ thead, tbody,show=false,hrefSee, hrefUpdate}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
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
          <TabsRowsUseless showEye={show} key={body.id} data={body} index={index} columns={thead} hrefSee={hrefSee} hrefUpdate={hrefUpdate}/>
        ))}
      </tbody>
    </table>
  )
}

export default TabsUseless