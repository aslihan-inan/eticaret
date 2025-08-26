// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import MainLayout from "./Layout/MainLayout.jsx";
import Home from "./Home";
import Shop from "./Shop";
import Detail from "./Detail";
import Contact from "./Contact";
import Pages from "./Pages";
import About from "./About";
import Signup from "./pages/signup";
import Login from "./login";
import { checkToken } from "./redux/actions/authActions"; 
import ShopPage from "./pages/ShopPage"; 


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact  path="/" render={() => (  <MainLayout> <Home /> </MainLayout>  )}/>
        <Route path="/shop"  render={() => (  <MainLayout>   <Shop />  </MainLayout> )}/>
        <Route path="/detail/:id" render={() => (  <MainLayout>   <Detail /> </MainLayout> )} />
        <Route path="/contact"  render={() => ( <MainLayout>  <Contact /></MainLayout> )} />
        <Route path="/pages" render={() => ( <MainLayout> <Pages /> </MainLayout>  )} />
        <Route path="/about" render={() => ( <MainLayout>  <About /> </MainLayout>  )} />
        <Route path="/signup"  render={() => (<MainLayout><Signup /> </MainLayout>)}/>
        <Route path="/login"render={() => (<MainLayout><Login /></MainLayout> )} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<Shop />} />


      </Switch>
    </Router>
  );
}
