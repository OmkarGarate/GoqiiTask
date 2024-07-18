import React, { useContext, useEffect, useState } from 'react'
import '../css/home.css'


function EditUser({id}) {
    const [ipClick, setIpClick] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [user, setUser] = useState()

    const fetchData = async()=>{
        const response = await fetch(`http://localhost:5000/users/getOneUser/${id}`);
        const json = await response.json()
        setUser(json)
        setName(json.name)
        setEmail(json.email)
        setDob(json.dob)
      }

    useEffect(()=>{
        
          fetchData()
    }, [])

    console.log("User", user)

    
    
    const handleSubmit = async(e) =>{
        e.preventDefault()

        try{

            const data = {
                name, 
                email,
                dob
            }

            const response = await fetch(`http://localhost:5000/users/updateUser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const json = await response.json()
            fetchData()
            console.log(json)
        }catch(error){
            console.log("Error updating the user: ", error)
        }
    }

  return (
    // <div className='editUser'>
        
        <form onSubmit={handleSubmit}>
            
            <h1>Edit User</h1>
            <div className="details">
                <div className="det" onClick={()=>setIpClick('name')}>
                    <label htmlFor="name" style={{top: ipClick === 'name' || name ? "-10px" : "7px", fontSize: ipClick === 'name' || name ? "0.8rem" : "1rem"}}>Name</label>
                    <input type="text"  id='name' onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="det" onClick={()=>setIpClick('email')}>
                    <label htmlFor="email" style={{top: ipClick === 'email' || email ? "-10px" : "7px", fontSize: ipClick === 'email' || email ? "0.8rem" : "1rem"}}>Email</label>
                    <input type="email" id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>
                <div className="det" onClick={()=>setIpClick('dob')}>
                    <label htmlFor="dob" style={{top: ipClick === 'dob' || dob ? "-10px" : "7px", fontSize: ipClick === 'dob' || dob ? "0.8rem" : "1rem"}}>Date of Birth</label>
                    <input type="date"  id='dob' onChange={(e)=>setDob(e.target.value)} value={dob}/>
                </div>
                
            </div>
            <button className='createBtn'>Edit</button>
        </form>
    // </div>
  )
}

export default EditUser