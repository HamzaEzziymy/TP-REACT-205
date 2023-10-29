import React, { useEffect, useState } from 'react'
import Header from './Header';
import { database } from "./FirebaseConfig";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import UserInfoForm from './UserInfoForm';


function Profile() {
  const [user, setUser] = useState({});
  const history = useNavigate();
  
  useEffect(
    onAuthStateChanged(database, (currentUser)=> {
      setUser(currentUser);
    }),
  [])


  if(!user){
    history("/formil")
  }
  return (
    <div>
      <Header/>
      <UserInfoForm user={user?user:""}/>
    </div> 
  )
}

export default Profile;