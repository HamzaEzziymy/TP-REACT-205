import React, { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { database } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";


function Formil(){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");

    const [sign, setSign] = useState(false);
    const [log, setLog] = useState(false);
    const [patte, setPatte] = useState(false);

    const [user, setUser] = useState({});

    const history = useNavigate();

    //-------------------------------------------------
    const handleInput = (e)=>{
        if(e.target.name==="email"){
            setEmail(e.target.value);
            setLog(false);
            setSign(false);
            setPatte(false);

        }else{
            setPassword(e.target.value);
            setLog(false);
            setSign(false);
            setPatte(false);

        }
    }
    //-------------------------------------------------
    const handleLogin = (e)=>{
        setSign(false)
        setPatte(false);
    
        signInWithEmailAndPassword(database, email, password).then(data=>{
            history("/");
        }).catch(Err=>{
            setLog(true);
        })
    }

    //-------------------------------------------------
    const handleSignUp = (e)=>{
        setLog(false)

        createUserWithEmailAndPassword(database, email, password).then(data=>{
            history("/");
        }).catch(Err=>{
            const pat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if(password.length>=6 && pat.test(email)){
                setSign(true);
            }else{
                setPatte(true);
            }

        })

    }
    return(
        <div className="Form">
            <div className="border border-2 p-5 pt-0 ">
                <h1 className="text-center">SignUp And Login</h1><br/>
                <form>
                    <label>Email</label><br/>
                    <input className="w-100" name="email" onInput={(e)=>handleInput(e)} type="email" placeholder="Email"/><br/><br/>

                    <label>Password</label><br/>
                    <input className="w-100" name="password" onInput={(e)=>handleInput(e)} type="password" placeholder="Password"/><br/><br/>

                </form>
                <button onClick={handleSignUp} className="btn btn-primary w-100">SignUp</button><br/>

                <span className="text-danger">{sign? "Email Already Used":" " }</span>
                <p className="text-danger">{patte? "email or password not complet!":" " }</p>
                <hr/>
                <button onClick={handleLogin} className="btn btn-success w-100">Login</button><br/>
                <span className="text-danger">{log? "Email or Password Incorect!":" " }</span>
            </div>

        </div>
    )

}
export default Formil;