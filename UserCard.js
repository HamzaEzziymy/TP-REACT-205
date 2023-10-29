import React, { useEffect } from 'react'

function UserCard(props) {
  const userInof = props.userInof;
  const logOut = props.logOut;
  const user = props.user;

  return (
    <div className='usercard'>
      <div className='p-5'>
        <img className='bg-dark' src={userInof.photoprofile}/>
        <h1>{userInof.fullname}</h1>
        <h2>{user.email}</h2>
        <button onClick={logOut} className='w-75 btn btn-danger mt-5'>Sign Out <i class="fa fa-sign-out"></i></button>
      </div>  
    </div>
  )
}

export default UserCard;