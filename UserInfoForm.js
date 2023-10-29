import React, { useEffect, useState } from 'react'
// import Header from './Header';
import { database, db, storage } from "./FirebaseConfig";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { DocumentSnapshot, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
import UserCard from './UserCard';



function UserInfoForm(props) {
  const [fullname, setFullname] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [photoprofile, setPhotoprofile] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [userInof, setUserInfo] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const history = useNavigate();

  const userid = props.user.uid;
  //-------------------------------------------
  const usersCollectionRef = collection(db, "users");
  try {var myDocRef = doc(usersCollectionRef, `${userid}`);}catch(err) {console.log(err)}

  const handleClickSubmit = async (e) =>{
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    setPhotoprofile("https://firebasestorage.googleapis.com/v0/b/xstore-2023.appspot.com/o/images%2F"+imageRef.name+"?alt=media&token=617a0981-7f65-4f82-bf68-680a3bbc4b6e&_gl=1*1lk13x4*_ga*NzMzMTEyNjU1LjE2OTc3NDQyODk.*_ga_CW55HF8NVT*MTY5ODUxMDI2MS4zNC4xLjE2OTg1MjEwODYuNDguMC4w")
    uploadBytes(imageRef, imageUpload).then((snapshot) => {});
    try {await setDoc(myDocRef,{fullname:fullname, age:age, gender:gender,photoprofile:photoprofile});alert("The account has been activated");setIsSubmit(true);window.location.reload();} catch (error) {console.log(error)}
  }
  //-------------------------------------------
  const documentRef = doc(db, "users", `${userid}`);
  useEffect(() => {
    const getUsers = async () =>{
      const data = await getDoc(documentRef);
      if (data.exists()) {
        const documentData = data.data();
        setIsSubmit(true);
        setUserInfo(documentData);
        setIsSubmit(true);
      }else{
        setIsSubmit(false);
      }
    }
    getUsers();
  }, [userid])
  //-------------------------------------------


  const handleClickSignOut = ()=>{
    signOut(database).then(val=>{
        history("/")
    })
  }

  return (
    (!isSubmit)?
    <div>
      <div className='profile'>
        <div className='foProfile bg-light text-dark p-3'>
          <input className='w-100' type='text' required minlength="3" placeholder='Full Name' name='full_name' onInput={e=>setFullname(e.target.value)}/><br></br>
          <input className='w-100' type='number'  placeholder='Age' name='age' onInput={(e)=>setAge(e.target.value)}/>
          <div>
            <h5>Gender</h5>
            Male<input type='radio' name='gender' value="male" onInput={(e)=>setGender(e.target.value)}/><i> </i>
            female<input type='radio' name='gender' value="female" onInput={(e)=>setGender(e.target.value)}/>
          </div>
          <div>
            <h6>Photo profile</h6>
            <input class="form-control form-control-lg" name='photo_profile' onChange={(event) => {setImageUpload(event.target.files[0]);}} type="file"/>
          </div><br/>
          <button className='btn btn-success w-50' onClick={handleClickSubmit}>Enter 2click</button><br/>
          <button className="btn btn-danger w-50" onClick={handleClickSignOut}>SignOut</button>
          <h5>{props.user.email}</h5>
        </div>
      </div>
    </div>
    :<UserCard userInof={userInof} user={props.user} logOut={handleClickSignOut}/>
  )
}

export default UserInfoForm;