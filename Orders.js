import React, { useEffect, useState } from 'react'
import Header from './Header';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { database, db } from './FirebaseConfig';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

function Myorders() {

  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const ordersCollectionRef = collection(db, "Orders");
  const history = useNavigate();

   //-------------Orders-----------
   useEffect(() => {
    var getOrders = async () => {
      const data = await getDocs(ordersCollectionRef);
      setOrders(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    getOrders();
  }, deleteorder)

  // -------------delete order-----
  var deleteorder = async (id) =>{
    if(window.confirm("Do you want really to delet this Order?")){
      const userDoc = doc(db, "Orders", id); 
      await deleteDoc(userDoc);
    }
  }


  onAuthStateChanged(database, (currentUser)=> {
    setUser(currentUser);
  })
  
  if(!user){history("/formil")};

  return (
    <div>
      <Header/>
      <div className='myorders m-5'>
        <h1 className='text-center text-success'>My Orders</h1>
        <div>
          {
            orders.map((order, i)=>(
              (order.uid==user.uid)?
              <div key={i} className='myorder row'>
                <img src={order.image}/>
                <div>
                  <h2>{order.product_name}</h2>  
                  <h4>{order.price}</h4>  
                </div>
                <div><button className='btn btn-danger h-100' onClick={()=>deleteorder(order.id)}>Delete Order</button></div>
              </div>
              :<h2 className='text-danger'>No Order Yet !!!</h2>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Myorders;