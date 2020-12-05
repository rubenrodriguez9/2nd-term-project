import React from 'react'
import {Link} from 'react-router-dom'


 const Home = () => {
    return (

        <ul>
            <li>
                <Link to="/sign-in"  >Sign in</Link>
            </li>
            <li>
                <Link to="/sign-up"  >Register</Link>
            </li>
        </ul>
        
    )
}

export default Home