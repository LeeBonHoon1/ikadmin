import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Group from "./pages/group/Group";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Notice from "./pages/notice/Notice";
import Log from "./pages/log/Log";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => !!state.user.email);
  console.log(isLoggedIn);

  return (
    <>
      <Router>
        {isLoggedIn ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/group">
                  <Group />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/notice">
                  <Notice />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
                <Route path="/log">
                  <Log />
                </Route>
              </Switch>
            </div>
          </>
        ) : (
          <Route>
            <Login />
          </Route>
        )}
      </Router>
    </>
  );
}

export default App;
