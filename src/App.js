import React, { Component } from 'react'
import LoanList from "./components/loanList/LoanList"
import validator from "validator"

export class App extends Component {

  state ={
    isAuth: false,
    email: '',
    password: ''
  }

  handleOnChange =  (event) => {
    
    this.setState({
      [event.target.name]: event.target.value
    })
   
    let emailCheck = validator.isEmail(this.state.email)
    

    console.log(emailCheck);
  }


  handleOnSubmit = (event) => {
    event.preventDefault()


    this.setState({
      isAuth: true
    })
  }

  render() {

    const {isAuth} = this.state
    return (
      <>
        {isAuth ? <LoanList/> :
         <form onSubmit={this.handleOnSubmit} style={{textAlign: "center", marginTop: "10%"}} >
           <input type='text' placeholder="Email" onChange={this.handleOnChange} name='email' value={this.state.email} /> <br/>
           <input type='text' placeholder="Password"/> <br/>
           <button  >Submit</button>
         </form>}
      </>
    )
  }
}

export default App
