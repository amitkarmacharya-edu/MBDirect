import React from 'react';
import { Link } from 'react-router-dom';
import Footer from "../../components/Footer";
import Main from "../../components/Main";
import Header from "../../components/Header";
function Home() {

 

    return(

        <div className="mt-2" style={{color: "white"}}>
            Home page content 
            <Link to="/login" style={{color: "red"}}> Login</Link>

        </div>
    )
}

export default Home;