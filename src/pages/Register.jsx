import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function Register (){
    const [username, setUsername] = useState('');
    const [password, setPassword]= useState('');
    const [email, setEmail]= useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    async function register(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username, password, email,firstName, lastName}),
            headers: {'Content-Type': 'application/json'},
        });
        if(response.status === 200) {
            alert('Registration was a success');
            navigate('/login')
        } else {
            alert('Registration failed')
        }
    }
    return(
       <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input 
        type="text" 
        placeholder="username" 
        value={username}
        onChange={ev => setUsername(ev.target.value)}
        />
        <input 
        type="text" 
        placeholder="first name" 
        value={firstName}
        onChange={ev => setFirstName(ev.target.value)}
        />
        <input 
        type="text" 
        placeholder="last name" 
        value={lastName}
        onChange={ev => setLastName(ev.target.value)}
        />
        <input 
        type="password" 
        placeholder="password" 
        value={password}
        onChange={ev => setPassword(ev.target.value)}
        />
        <input 
        type="email" 
        placeholder="email" 
        value={email}
        onChange={ev => setEmail(ev.target.value)}/>
        <button>Register</button>
       </form>
    )
}