import React, { useEffect, useState } from 'react'
import '../css/home.css'
import AllUsers from './AllUsers'

function Home() {

    const [ipClick, setIpClick] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState('')
    const [users, setUsers] = useState([])


    const fetchData = async()=>{
        const response = await fetch('http://localhost:5000/users/getAllUsers');
        const json = await response.json()
        setUsers(json)
      }

    useEffect(()=>{
        
          fetchData()
    }, [])

    
    
    const handleSubmit = async(e) =>{
        e.preventDefault()

        try{

            const data = {
                name, 
                email,
                password,
                dob
            }

            const response = await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const json = await response.json()
            fetchData()
            console.log(json)
        }catch(error){
            console.log("Error creating the user: ", error)
        }
    }

  return (
    <div className='home'>
        <form onSubmit={handleSubmit}>
            <h1>Create User</h1>
            <div className="details">
                <div className="det" onClick={()=>setIpClick('name')}>
                    <label htmlFor="name" style={{top: ipClick === 'name' || name ? "-10px" : "7px", fontSize: ipClick === 'name' || name ? "0.8rem" : "1rem"}}>Name</label>
                    <input type="text"  id='name' onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="det" onClick={()=>setIpClick('email')}>
                    <label htmlFor="email" style={{top: ipClick === 'email' || email ? "-10px" : "7px", fontSize: ipClick === 'email' || email ? "0.8rem" : "1rem"}}>Email</label>
                    <input type="email" id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>
                <div className="det" onClick={()=>setIpClick('password')}>
                    <label htmlFor="password" style={{top: ipClick === 'password' || password ? "-10px" : "7px", fontSize: ipClick === 'password' || password ? "0.8rem" : "1rem"}}>Password</label>
                    <input type="password" id='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </div>
                <div className="det" onClick={()=>setIpClick('dob')}>
                    <label htmlFor="dob" style={{top: ipClick === 'dob' || dob ? "-10px" : "7px", fontSize: ipClick === 'dob' || dob ? "0.8rem" : "1rem"}}>Date of Birth</label>
                    <input type="date"  id='dob' onChange={(e)=>setDob(e.target.value)} value={dob}/>
                </div>
                
            </div>
            <button className='createBtn'>Create</button>
        </form>
        <AllUsers users={users} fetchData={fetchData}/>

        
    </div>
  )
}

export default Home