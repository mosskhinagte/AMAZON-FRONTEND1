import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductSceen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreeen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import OrderScreen from './screens/OrderScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>

      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">MOSS INTERNATIONAL</Link>
          </div>


          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{''}
                </Link>
                <ul className="dropdown-content">

                  <li>
                    <Link to="/profile">User Profile</Link>

                  </li>



                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>

                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (

              <Link to="/signin">Sign In</Link>
            )}




            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin<i className="fa fa-caret-down"></i>
                </Link>





                <ul className="dropdown-content">

                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>

                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>


                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>

                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>

                </ul>


              </div>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductSceen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreeen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <Route path="/" component={HomeScreen} exact></Route>

        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;