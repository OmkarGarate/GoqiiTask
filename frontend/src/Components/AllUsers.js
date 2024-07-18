import React, { createContext, useContext, useEffect, useState } from 'react'
import EditUser from './EditUser'

function AllUsers({users, fetchData}) {

  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState('')
  const [dp, setDp] = useState('none')

  useEffect(()=>{
    if(dp === 'none')
    {
      fetchData()
    }


    
  },[dp])

  const handleDelete = async(id)=>{
        try{
            const response = await fetch(`http://localhost:5000/users/deleteUser/${id}`, {
                method: 'DELETE',
            })

            const json = await response.json()
            fetchData()
            console.log(json)
        }catch(error){
            console.log("Error deleting the user: ", error)
        }
  }

  // console.log(users)
  return (
    <div className='allUsers'>
    <h1>All Users</h1>
    <table>
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date Of Birth</th>
          <th>Modify</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map((user, index)=>(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>
                <button className='edit' onClick={()=>{
                  setIsEdit(!isEdit)
                  setId(user._id)
                  setDp('flex')
                  }}>Edit</button>
                <button className='delete' onClick={()=>{
                  handleDelete(user._id)
                  }}>Delete</button>
              </td>
            </tr>
        ))}


          
      </tbody>
    </table>
    <div className="editUser" style={{display: dp}}>
      <div className='close' onClick={()=>setDp('none')}>X</div>
      {dp === 'flex' ? <EditUser id={id}/>  : ""}
        
      </div>
    </div>
    
  )
}

export default AllUsers