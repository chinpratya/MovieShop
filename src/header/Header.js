import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import './Header.css';
export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark " >
  <a className='brand' href="/">MovieShop</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">หน้าหลัก</a>
      </li>
      <li class="nav-item dropdown active">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ประเภท
        </a>
        <div class="dropdown-menu active" aria-labelledby="navbarDropdown" >
          <Link to={`/category/10749/Romance`} class="dropdown-item" >Romance</Link>
          <div class="dropdown-divider"></div>
          <Link to={`/category/36/History`} class="dropdown-item" >History</Link>
          <div class="dropdown-divider"></div>
          <Link to={`/category/28/Action`} class="dropdown-item" >Action</Link>
          <div class="dropdown-divider"></div>
          <Link to={`/category/12/Adventure`} class="dropdown-item" >Adventure</Link>
          <div class="dropdown-divider"></div>
          <Link to={`/category/16/Animation`} class="dropdown-item" >Animation</Link>
          <div class="dropdown-divider"></div>
          <Link to={`/category/35/Comedy`} class="dropdown-item" >Comedy</Link>
          <div class="dropdown-divider"></div>
          <Link to={`/category/18/Drama`} class="dropdown-item" >Drama</Link>
        </div>
      </li>
      <li class="nav-item active">
        <a class="nav-link " href="/shcart">ตะกร้าสินค้า</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input type="text" class="form-control mr-sm-2" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)}/>
      <Link to={`/search/${search}`}><button class="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button></Link>
      
    </form>
  </div>
</nav>
    </div>
  )
}

