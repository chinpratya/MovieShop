import React from "react";
import "./ShoppingCart.css";
import { useState, useEffect } from "react";
export default function ShoppingCart() {
  const [movies, setMovies] = useState(() => {
    const Cart = localStorage.getItem("Cart");
    if (Cart) {
      return JSON.parse(Cart);
    } else {
      return [];
    }
  });
  const [item, setItem] = useState(() => {
    const sumitem = movies.reduce(
      (total, currentValue) => (total = total + currentValue.countItem),
      0
    );
    return sumitem;
  });
  const [price, setPrice] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(1);
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      
      if (seconds <= 60 && seconds !== 0) {
        setMinutes(minutes-1)
        setMinutes(0);
        setSeconds(seconds - 1);
      } else {
        document.getElementById("closeBtn").click();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(movies));
    const sumitem = movies.reduce(
      (total, currentValue) => (total = total + currentValue.countItem),
      0
    );
    setItem(sumitem);

    if (sumitem >= 5) {
      const Price = movies.reduce(
        (total, currentValue) =>
          (total = total + ((currentValue.vote_average * currentValue.countItem)*100)),
        0
      );
      let totalPrice = Price - (20 / 100) * Price;
      setPrice(Math.floor(totalPrice));
      console.log(totalPrice);
    } else if (sumitem >= 3) {
      const Price = movies.reduce(
        (total, currentValue) =>
          (total = total + ((currentValue.vote_average * currentValue.countItem)*100)),
        0
      );
      let totalPrice = Price - (10 / 100) * Price;
      setPrice(Math.floor(totalPrice));
    } else {
      const Price = movies.reduce(
        (total, currentValue) =>
          (total = total + ((currentValue.vote_average * currentValue.countItem)*100)),
        0
      );
      setPrice(Math.floor(Price));
    }

    console.log(price);
  }, [movies]);
  function Buyitem() {
    setSeconds(60);
  }
  function Buysuccess() {
    localStorage.clear("Cart");
    window.location.reload(false);
  }
  function plusCount(id) {
    setMovies((movies) =>
      movies.map((item) =>
        item.id === id ? { ...item, countItem: item.countItem + 1 } : item
      )
    );
  }
  function disCount(id) {
    setMovies((movies) =>
      movies.map((item) =>
        item.id === id
          ? item.countItem > 1
            ? { ...item, countItem: item.countItem - 1 }
            : { ...item, countItem: 1 }
          : item
      )
    );
  }
  function ClearCart() {
    localStorage.clear("Cart");
    window.location.reload(false);
  }
  function deleteitem(id) {
    const Moviesnew = movies.filter((movies) => movies.id !== id);
    setMovies(Moviesnew);
  }
  return (
    <div>
      <div className="container">
        <div className="contentBx">
          <h2 className="titlePage">ตะกร้าสินค้า</h2>
          <div className="contentitem">
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      ช่องทางชำระเงิน
                    </h5>

                    {/* <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button> */}
                    <div className="time">
                      <h5 class="modal-title">
                        เวลาในการชำระ : {minutes}:{seconds}
                      </h5>
                    </div>
                  </div>
                  <div class="modal-body">
                    <div className="imgBankBx">
                      <img
                        src={require("../assets/Kbank.jpg")}
                        alt=""
                        className="imgbank"
                      />
                      <p className="detailBank">เลขที่บัญชี :1234567890</p>
                    </div>
                    <div className="imgBankBx">
                      <img
                        src={require("../assets/KTB-logo.jpg")}
                        alt=""
                        className="imgbank"
                      />
                      <p className="detailKTB">เลขที่บัญชี :1112222333</p>
                    </div>
                    <h5 class="modal-title" id="exampleModalLabel">
                      ยอดรวม : {price} บาท
                    </h5>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      id="closeBtn"
                      onClick={Buyitem}
                    >
                      กลับ
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      onClick={Buysuccess}
                    >
                      เรียบร้อย
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {movies.length !== 0 ? (
              movies.map((movies) => (
                <div className="cardBx" key={movies.id}>
                  <div className="imgBx">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
                      alt="img-poster"
                      className="poster"
                    />
                  </div>
                  <div className="nameMovie">
                    <p>{movies.original_title}</p>
                  </div>
                  <div className="price">
                    <p>
                      ราคา :{" "}
                      {Math.floor((movies.vote_average * movies.countItem)*100)} บาท
                    </p>
                  </div>
                  <div className="count">
                    <button
                      className="btncount"
                      onClick={() => disCount(movies.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={movies.countItem}
                      disabled
                      className="countitem"
                    />
                    <button
                      className="btncount"
                      onClick={() => plusCount(movies.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="btnBx">
                    <button
                      className="btnDelete"
                      onClick={() => deleteitem(movies.id)}
                    >
                      นำออก
                    </button>
                    {/* <button className='btnBuy' data-toggle="modal" data-target="#exampleModal">สั่งซื้อ</button>   */}
                  </div>
                </div>
              ))
            ) : (
              <div className="Emty-item">
                <h3>ท่านยังไม่มีสินค้า</h3>
                <span>
                  ต้องการเลือกซื้อสินค้า? <a href="/">ซื้อสินค้า</a>
                </span>
              </div>
            )}


{movies.length !== 0 ? (
            <div className="box">
              <div className="totalpriceBx">
                <p className="totalprice">ยอดรวม : {price} บาท</p>
              </div>
              <div className="btnBx">
                <button className="btnClear" onClick={ClearCart}>
                  นำออกทั้งหมด
                </button>
                <button
                  className="btnBuyall"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  สั่งซื้อ
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          </div>
          
        </div>
      </div>
    </div>
  );
}
