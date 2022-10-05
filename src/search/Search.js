import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";
import { Link } from "react-router-dom";
export default function Search(props) {
  const { text } = useParams();
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
          `https://api.themoviedb.org/3/search/movie?api_key=a4893bf47ad0104883bb0681284dc40e&language=en-US&query=${text}`
        )
        .then((res) => {
          setMovies(res.data.results);
          console.log(movies);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, [movies]);
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
      document.getElementById("showAlert").click();
    } else {
      alert("ท่านมีสินค้าในตะกร้าแล้ว");
    }

    // localStorage.setItem("Cart", JSON.stringify(movieCart));
    console.log(moviefind);
  }
  return (
    <div>
      <h3>ค้นหาด้วย {text}</h3>
      <div className="container">
        <div id="myModal" class="modal fade">
          <div class="modal-dialog modal-confirm">
            <div class="modal-content">
              <div class="modal-header">
                <div class="icon-box">
                  <i class="material-icons">&#xE876;</i>
                </div>
                <h4 class="modal-title w-100">เพิ่มเรียบร้อย!</h4>
              </div>
              <div class="modal-body">
                <img
                  src={require("../assets/shopping-cart.png")}
                  alt=""
                  className="imgAlert"
                />
              </div>
              <div class="modal-footer">
                <button class="btn btn-success btn-block" data-dismiss="modal">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {movies.map((data, index) => (
          <div className="card" key={data.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt=""
            />
            <Link to={`/detail/${data.id}`}>
              <p className="title">{data.original_title}</p>
            </Link>
            <p className="price">
              ราคา : {Math.ceil((data.vote_average + 3) * 100)} บาท
            </p>
            <div className="btbBx">
              <button className="ntn-buy" onClick={() => AddCart(data)}>
                เพิ่มลงตะกร้า
              </button>
              <a id="showAlert" data-toggle="modal" data-target="#myModal"></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
