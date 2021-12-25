import React from "react";
import "../../App.css";
import Search from "./Search";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user-actions";

const Header = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const lougoutHandler = () => {
    dispatch(logout());
    alert("you have successly lougout");
  };
  return (
    <div>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div>
            <Link to="/">
              <img src="./images/logo2.png" className="logo" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
          {/* we did this khater manech hattin lcomponetent hethe f app.js
           heke aalech ylzmna n3aytou lil history b Route jdida*/}
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              2
            </span>
          </Link>
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white"
                type="button"
                id="
              dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role !== "admin" ? (
                  <Link className="dropdown-item" to="orders/me">
                    orders
                  </Link>
                ) : (
                  <Link className="dropdown-item" to="/dashboard">
                    dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  to="/"
                  className="dropdown-item text-danger"
                  onClick={lougoutHandler}
                >
                  logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
