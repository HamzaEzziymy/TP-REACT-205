import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Formil from "./Formil";
import Home from "./Home";
import Products from "./Products";
import Myorders from "./Orders";
import Profile from "./Profile";



function Appxstore(){
    return(<>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/formil" element={<Formil/>} />
                    <Route path="myorders" element={<Myorders/>} />
                    <Route path="products" element={<Products/>} />
                    <Route path="Profile" element={<Profile/>} />
                </Routes>
            </div>
        </BrowserRouter>
        </>
    )
}


export default Appxstore;