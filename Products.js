import React, { useEffect, useState } from 'react'
import Header from './Header';
import { database, db, storage } from './FirebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
// import { ref } from "firebase/storage";
import { onAuthStateChanged } from 'firebase/auth';




function Products() {
  const [limitedoffer, setLimitedoffer] = useState([]);
  const [products, setProducts] = useState([]);

  const productsCollectionRef = collection(db, "products");
  const limitedofferCollectionRef = collection(db, "limitedoffer");

  
  const usersCollectionRef = collection(db, "Orders");
  
  
  
  //------------limitedoffer-------
  useEffect(() => {
    const getLimitedoffer = async () => {
      const data = await getDocs(limitedofferCollectionRef);
      setLimitedoffer(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    getLimitedoffer();
  }, [])
  //-------------products-----------
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    getProducts();
  }, [])


  // -------------------------------
  const [user, setUser] = useState();
  useEffect(
    onAuthStateChanged(database, (currentUser)=> {
      setUser(currentUser);
    }),
  [])
  
  const handleAddOrder = async (product) =>{
    alert("Added to Orders Is success");
    const newDocRef = await addDoc(usersCollectionRef, {...product, uid:user.uid});
  }
  limitedoffer.map((p,i)=>{
    console.log(p);
  })
  return (
    <div>
      <Header/>
      <div className="card text-center m-5">
        <h5 className="card-header">Limited Offer</h5>
        <div className="card-body row">
          {limitedoffer.map((product, i) => (
            <div key={i} className="card col-4">
              <img src={product.image} className='img'/>
              <div className="card-body">
                <span className='fa fa-star'></span>
                <span className='fa fa-star'></span>
                <span className='fa fa-star'></span>
                <span className='fa fa-star'></span>
                <span className='fa fa-star'></span>
                <p>{product.product_name}</p>
                <div className='text-center'><h4>{product.price}</h4><s>79,17$</s></div>
                <button className='btn btn-success' onClick={()=>handleAddOrder(product)}>Add to Orders Now <span className='fas fa-cart-plus'></span></button>
              </div>
            </div>
          ))}
        </div>
        <div className="card-footer text-muted">
          <h3 style={{color:"red"}}>2 Days 3 Hours 23 Mins</h3>
        </div>
      </div>
      <div className='row p-5'>
        {products.map((product,i)=>(
          <div className='card col-3' key={i}>
            <img className="card-img-top" src={product.image} alt="image"/>
            <div className="card-body">
              <span className='fa fa-star'></span>
              <span className='fa fa-star'></span>
              <span style={product.nstars<3?{color:"#ccc"}:{color:"rgb(235, 235, 47)"}} className='fa fa-star'></span>
              <span style={product.nstars<4?{color:"#ccc"}:{color:"rgb(235, 235, 47)"}} className='fa fa-star'></span>
              <span style={product.nstars<5?{color:"#ccc"}:{color:"rgb(235, 235, 47)"}} className='fa fa-star'></span>
              <h6 className='text-info'>{product.product_name}</h6>
              <h6>{product.price}</h6>
              <button className='w-100 btn btn-primary' onClick={()=>handleAddOrder(product)}>Add Now<span className='fas fa-cart-plus'></span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products;