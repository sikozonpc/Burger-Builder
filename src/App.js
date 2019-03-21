import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} exact/>
          <Route path="/" component={BurgerBuilder} exact/>
         
        </Layout>
      </div>
    );
  }
}


export default App;
