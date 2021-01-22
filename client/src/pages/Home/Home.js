import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

    return(
        <div className="mt-2" style={{color: "white"}}>
            Home page content 
            <Link to="/login" style={{color: "red"}}> Login</Link>

        </div>
    )
}

export default Home;