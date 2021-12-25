import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layaout/Header";
import Footer from "./components/layaout/Footer";
import Home from "./components/Home";
import MatchDetails from "./components/match/MatchDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { Loaduser } from "./actions/user-actions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/routes/ProtectedRoutes";
import MatchsList from "./components/admin/MatchsList";
import Dashboard from "./components/admin/Dashboard";
import NewMatech from "./components/admin/NewMatech";
import UsersList from "./components/admin/UsersList";
import UpdateProfile from "./components/user/UpdateProfile";
import { store } from "./store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UpdateMatche from "./components/admin/UpdateMatche";

function App() {
  useEffect(() => {
    store.dispatch(Loaduser());
  }, []);
  const { user, isAuthtenticated, loading } = useSelector(
    (state) => state.auth
  );
  console.log(user, "from app");

  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/match/:id" component={MatchDetails} exact />
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute
          path="/admin/matchs"
          isAdmin={true}
          component={MatchsList}
          exact
        />
        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/match"
          isAdmin={true}
          component={NewMatech}
          exact
        />
        <ProtectedRoute
          path="/admin/match/:id"
          isAdmin={true}
          component={UpdateMatche}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
          exact
        />
        <ProtectedRoute path="/me/update" component={UpdateProfile} exact />

        {!loading && (!isAuthtenticated || user.role !== "admin") && <Footer />}
      </div>
    </Router>
  );
}

export default App;
