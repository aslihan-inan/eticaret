// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./Home";
import Shop from "./pages/Shop";
import Detail from "./Detail";
import Contact from "./Contact";
import Pages from "./Pages";
import About from "./About";
import Signup from "./pages/signup";
import Login from "./Login";
import CartTable from "./pages/CartTable"; 
import { loginSuccess } from "./redux/reducers/authReducer";
import  store  from "./redux/store";
import CreateOrder from "./pages/CreateOrder.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Sayfa yenilendiğinde localStorage’daki token varsa kullanıcıyı geri yükle
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user"); // stringified JSON olabilir
    if (token && user) {
      dispatch(loginSuccess(JSON.parse(user), token));
    }
  }, [dispatch]);

  return (
    <Router>
      <Toaster position="top-right" />
      <Switch>
        {/* Layout’suz sayfalar */}
        <Route path="/login" component={Login} />
         <ProtectedRoute path="/create-order" component={CreateOrder} />

        {/* Layout kullanılan sayfalar */}
        <Route
          path="/shop/:gender/:categoryName/:categoryId"
          render={(props) => (
            <MainLayout>
              <Shop {...props} />
            </MainLayout>
          )}
        />

        <Route
          exact
          path="/shop"
          render={() => (
            <MainLayout>
              <Shop />
            </MainLayout>
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <MainLayout>
              <Home />
            </MainLayout>
          )}
        />

        <Route
          path="/detail/:id"
          render={(props) => (
            <MainLayout>
              <Detail {...props} />
            </MainLayout>
          )}
        />

        <Route
          path="/cart"
          render={() => (
            <MainLayout>
              <CartTable />
            </MainLayout>
          )}
        />

        <Route
          path="/contact"
          render={() => (
            <MainLayout>
              <Contact />
            </MainLayout>
          )}
        />

        <Route
          path="/pages"
          render={() => (
            <MainLayout>
              <Pages />
            </MainLayout>
          )}
        />

        <Route
          path="/about"
          render={() => (
            <MainLayout>
              <About />
            </MainLayout>
          )}
        />

        <Route
          path="/signup"
          render={() => (
            <MainLayout>
              <Signup />
            </MainLayout>
          )}
        />
      </Switch>
    </Router>
  );
}

// Redux Provider ile sarmala
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
