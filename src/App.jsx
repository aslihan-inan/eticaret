import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./Home";
import Shop from "./pages/Shop";
import Detail from "./Detail";
import Contact from "./Contact";
import Pages from "./Pages";
import About from "./About";
import Signup from "./pages/signup";
import Login from "./Login";
import { checkToken } from "./redux/actions/authActions";





export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {/* Dinamik shop önce */}
        <Route
          path="/shop/:gender/:categoryName/:categoryId"
          render={(props) => (
            <MainLayout>
              <Shop {...props} />
            </MainLayout>
          )}
        />

        {/* Sadece /shop */}
        <Route
          exact
          path="/shop"
          render={() => (
            <MainLayout>
              <Shop />
            </MainLayout>
          )}
        />

        <Route exact path="/" render={() => <MainLayout><Home /></MainLayout>} />
        <Route path="/detail/:id" render={(props) => <MainLayout><Detail {...props} /></MainLayout>} />
        <Route path="/contact" render={() => <MainLayout><Contact /></MainLayout>} />
        <Route path="/pages" render={() => <MainLayout><Pages /></MainLayout>} />
        <Route path="/about" render={() => <MainLayout><About /></MainLayout>} />
        <Route path="/signup" render={() => <MainLayout><Signup /></MainLayout>} />
        <Route path="/login" render={() => <MainLayout><Login /></MainLayout>} />
      </Switch>
    </Router>
  ); 
}
