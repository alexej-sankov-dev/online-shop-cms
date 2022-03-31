import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import history from '../history';

import Header from './general/Header';
import OrderList from './orders/OrderList';
import OrderCreate from './orders/OrderCreate';
import MyOrderList from './orders/MyOrderList';


class App extends React.Component {
  render () {
    return (
      <div className="ui container">
        <BrowserRouter location={history.location} navigator={history} forceRefresh={true}>
          <Header />
          <Routes>
              <Route path="/" element={<OrderList />}/>
              <Route path="/create-order" element={<OrderCreate />}/>
              <Route path="/my-orders" element={<MyOrderList />}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
