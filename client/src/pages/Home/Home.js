import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

    return(
        <div className="mt-2">
            Home page content
            <Link to="/login">Login</Link>

        </div>
    )
}

export default Home;