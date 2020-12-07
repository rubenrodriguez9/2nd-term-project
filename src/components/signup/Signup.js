import React, { Component } from 'react'
import validator from "validator"
import axios from "axios"

import jwtDecode from "jwt-decode"

import LoanList from "../loanList/LoanList"

export class Signup extends Component {

  state ={
    isAuth: false,
    email: '',
    password: '',
    emailSubmitError: false,
    emailSubmitErrorMessage: '',
    passwordError:false,
    passwordErrorMessage: ""

  }

  
    
  handleEmailOnChange =  (event) => {
    
    this.setState({
      [event.target.name]: event.target.value,
    })
      if (!validator.isEmail(this.state.email)) {
        this.setState({
          emailSubmitError: true,
          emailSubmitErrorMessage: 'Email must be email format'
        }) 
      } else if (validator.isEmail(this.state.email)) {
        this.setState({
          emailSubmitError: false,
          emailSubmitErrorMessage: ''
        }) 
      }
  }

  handlePasswordOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
    let isPassword = validator.matches(this.state.password,  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")

    if(!isPassword){
      this.setState({
        passwordError: true,
        passwordErrorMessage: 'Please enter at least one special character, capital letter, number and lowercase'
      })
    }

    if(isPassword){
      this.setState({
        passwordError: false,
        passwordErrorMessage: ''
      })
  }
  }

  handleOnSubmit =  async (event) => {
    event.preventDefault()

    if(validator.isEmpty(this.state.email) || validator.isEmpty(this.state.password)){
      this.setState({
        emailSubmitError: true,
        emailSubmitErrorMessage: 'Input fields cannot be empty'
      })
      return 
    }

  

    console.log(this.state);
    if(this.state.passwordError || this.state.emailSubmitError){
      return
    }

   

    try{

      let success = await axios.post("http://localhost:3001/api/users/create-user", {
        email: this.state.email,
        password: this.state.password

      })
      console.log(success);

    }
    catch (e) {


    }

    


  }
  componentDidMount ()  {

    let token = localStorage.getItem('jwtToken')

    if(token){

        let decoded = jwtDecode(token)

        let currentTime = Date.now() / 1000

        if(decoded.exp < currentTime){
            localStorage.removeItem("jwtToken")
        } else this.props.history.push("/loan-list")
    }

}
  render() {
    
    const {isAuth, emailSubmitError, emailSubmitErrorMessage, passwordError, passwordErrorMessage} = this.state
    console.log(isAuth)
    return (
      <>
        
        {isAuth ? <LoanList/> :
        
         <form onSubmit={this.handleOnSubmit} style={{textAlign: "center", marginTop: "10%"}} >
            {passwordError ? <div style={{textAlign: "center"}}> {passwordErrorMessage} </div> : null} 
           {emailSubmitError ? <div style={{textAlign: "center"}}> {emailSubmitErrorMessage} </div> : null}
           <input type='text' placeholder="Email" onChange={this.handleEmailOnChange} name='email' value={this.state.email} /> <br/>
           <input type='text' placeholder="Password"onChange={this.handlePasswordOnChange} name="password" value={this.state.password} /> <br/>
           <button  >Submit</button>
         </form>}
      </>
    )
  }
}

export default Signup
