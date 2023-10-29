import React from 'react'
import { NavLink } from 'react-router-dom'


function Header() {
  return (
    <div className='fheader'>
      <div className='header row bg-dark text-white p-sm-1 p-lg-2 w-100'>
          <h3 className='col logo'>XStore</h3>
          <ul className='row col-10 list-unstyled'>
              <li className='col'><NavLink to="/"> Home <span className='fa fa-home'></span> </NavLink></li>
              <li className='col'><NavLink to="/products"> Prudacts <span className='fab fa-product-hunt'></span></NavLink></li>
              <li className='col'><NavLink to="/myorders"> Orders <span className='fas fa-cart-arrow-down'></span></NavLink></li>
              <li className='col'><NavLink to="/profile"> Profil <span className='fa fa-user'></span></NavLink></li>
          </ul>
      </div>
    </div>
  )
}

export default Header;