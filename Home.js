// import { signOut } from "firebase/auth";
import React from "react";
// import { database } from "./FirebaseConfig";
// import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { NavLink } from "react-router-dom";


function Home(){ 

    return(
        <div>
            <Header/>
            <div className="div-home">
                <h1 className="text-center">Welcome To Xstore</h1>
                <p className="text-center"><NavLink to="/profile"> Sign In now</NavLink></p>
            </div>
        </div>
    )

}
export default Home;