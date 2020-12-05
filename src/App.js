import React, {Component} from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/signup/Signup"
import Home from './components/home/Home'
import Signin from './components/signin/Signin'
import LoanList from './components/loanList/LoanList'

 class App extends Component {

  render () {
  return (
      <Router>
        
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/sign-up" component={Signup}/>
          <Route exact path="/sign-in" component={Signin}/>
          <Route exact path="/loan-list" component={LoanList}/>
        </Switch>
      </Router>
    )
  }
}

export default App