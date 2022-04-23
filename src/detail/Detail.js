import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Detail.css";
import { Link } from "react-router-dom";
export default function Detail() {
    const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [movieCart, setMovieCart] = useState(() => {
    const Cart = localStorage.getItem("Cart");
    if (Cart) {
      return JSON.parse(Cart);
    } else {
      return [];
    }
  });
  useEffect(() => {
    return () => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=a4893bf47ad0104883bb0681284dc40e&language=en-US`
        )
        .then((res) => {
          setMovies(res.data);
          console.log(id);
          console.log(movies);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(movieCart));
  }, [movieCart]);
  function AddCart(data) {
    const moviefind = movieCart.find((movies) => movies.id === data.id);
    if (!moviefind) {
      let movie = {
        ...data,
        countItem: 1,
      };
      setMovieCart([...movieCart, movie]);
      document.getElementById("tocart").click();
    } else {
      alert("ท่านมีสินค้าในตะกร้าแล้ว");
    }

    // localStorage.setItem("Cart", JSON.stringify(movieCart));
    console.log(moviefind);
  }
  return (
    <div>
        <div className="container">
            <div className="detailcardBx">
                <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" />
                <div className="detailcontentBx">
                    <h2>{movies.original_title}</h2>
                    <div className="tex">
                        <p>SYNOPSIS<br />{movies.overview}</p>
                    </div>
                    <div className="prBX">
                        <p>คะแนน : {movies.vote_average}</p>
                        <p>ราคา : {Math.ceil(movies.vote_average*100)}  บาท</p>
                        
                    </div>
                    
                <Link to={'/'}><button className='btnhome'>หน้าหลัก</button></Link>
                {/* <Link to={'/shcart'}><button className='btnAdd' onClick={()=>AddCart(movies)}>เพิ่มลงตะกร้า</button></Link> */}
                <button className='btnAdd' onClick={()=>AddCart(movies)}>เพิ่มลงตะกร้า</button>
                <a href="/shcart" id='tocart'></a>
                </div>
                
            </div>
        </div>
    </div>
  )
}
