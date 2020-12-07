import React, {Component} from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/signup/Signup"
import Home from './components/home/Home'
import Signin from './components/signin/Signin'
import LoanList from './components/loanList/LoanList'
import Nav from './components/Nav/Nav'
import jwtDecode from 'jwt-decode';

 class App extends Component {

  state = {
    isAuth: false,
    user: null
  }

  isAuth = (jwtToken) => {
    let decoded = jwtDecode(jwtToken)

    this.setState({
      isAuth: true,
      user: {
        email: decoded.email,
        _id: decoded._id
      }
    })
  }

  render () {
  return (
      <Router>
        <Nav isAuth={this.state.isAuth} user={this.state.user} />
        <Switch>
          {/* <Route exact path="/" component={Home}/> */}
          <Route exact path="/sign-up" component={Signup}/>
          <Route exact
           path="/sign-in"
          component={(props) => <Signin {...props} isAuth={this.isAuth} /> }
          />

          <Route exact path="/loan-list" component={LoanList}/>
        </Switch>
      </Router>
    )
  }
}

export default App