import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import {UserContext} from '../UserContext';
import {useNavigate } from "react-router-dom";

function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
               setUserInfo(userInfo); 

            })
        });
    }, []);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
        navigate('/')
        window.location.reload()
    }

    const username = userInfo?.username;
    return(
        <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
            {
                username && (
                    <>
                    <a className="logout-btn" onClick={logout}>Logout</a>
                    </>
                )
            }
            {username === 'reneerooster' && (
                <>
                    <Link to='/create'>Create new post</Link>
                    
                </>
            )}
            {!username && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
      </header>
    )
};
export default Header;