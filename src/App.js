import './App.css';
import {Routes,Route,Link} from "react-router-dom";
import Header from './header/Header';
import Home from './home/Home';
import Search from './search/Search';
import ShoppingCart from './shoppingcart/ShoppingCart';
import Category from './category/Category'
import Detail from './detail/Detail'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search/:text"  element={<Search/>}/>
        <Route path="/shcart" element={<ShoppingCart/>}/>
        <Route path="/category/:id/:name" element={<Category/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
