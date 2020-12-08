import React from 'react';
import { NavBar } from './app/NavBar';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ProductsPage } from './features/products/ProductsPage';
import { Toolbar } from './app/Toolbar';
import { StrategiesPage } from './features/strategies/StrategiesPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Toolbar/>
      <div className="App">
        <Switch>
          <Route exact path="/management" />
          <Route exact path="/management/products" component={ProductsPage}/>
          <Route exact path="/management/strategies" component={StrategiesPage}/>
          <Redirect exact path="/management" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
