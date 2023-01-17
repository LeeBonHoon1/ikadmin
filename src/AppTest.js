import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Group from "./pages/group/Group";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => !!state.user.email);
  console.log(isLoggedIn);

  return (
    <>
      <Router>
        <>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return isLoggedIn ? (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route path="/users" exact>
                        <UserList />
                      </Route>
                      <Route path="/user/:userId" exact>
                        <User />
                      </Route>
                      <Route path="/newUser" exact>
                        <NewUser />
                      </Route>
                      <Route path="/group" exact>
                        <Group />
                      </Route>
                      <Route path="/product/:productId" exact>
                        <Product />
                      </Route>
                      <Route path="/newproduct" exact>
                        <NewProduct />
                      </Route>
                    </div>
                  </>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route path="/login" exact>
              <Login />
            </Route>
          </Switch>
        </>
      </Router>
    </>
  );
}

export default App;
