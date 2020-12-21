import React, { Component } from 'react'

import LoanList from "../loanList/LoanInputs"
import validator from 'validator'
import axios from 'axios'
import jwt_decode from "jwt-decode";

 class Signin extends Component {
    state ={
        user: null,
        email: '',
        password: '',
        emailSubmitError: false,
        emailSubmitErrorMessage: '',
    
      }
    
      componentDidMount () {
          let token = localStorage.getItem("jwtToken")
            if(token){

                let decoded = jwt_decode(token)

          this.setState({
              user: {
                  email: decoded.email,
                  _id: decoded._id
              }
          }, () => {
            this.props.history.push("/loan-list");
          })

            }
          

          
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
        if(this.state.passwordError || this.state.emailSubmitError){
          return
        }

        try{
    
            let success = await axios.post("http://localhost:3001/api/users/sign-in", {
              email: this.state.email,
              password: this.state.password
      
            })

            localStorage.setItem('jwtToken', success.data.jwtToken)

            this.setState({
                passwordError: false,
                emailSubmitErrorMessage: false,
                isAuth: true

            }, 
            
            () => {
                this.props.isAuth(success.data.jwtToken)
                this.props.history.push('/loan-list')})
      
          }
          catch (e) {
      
      
          }
    
    
      }
    
      render() {
        
        const {isAuth, emailSubmitError, emailSubmitErrorMessage} = this.state
        return (
          <>
            
            {isAuth ? <LoanList/> :
            
             <form onSubmit={this.handleOnSubmit} style={{textAlign: "center", marginTop: "10%"}}>
               {emailSubmitError ? <div style={{textAlign: "center"}}> {emailSubmitErrorMessage} </div> : null}
               <input type='text' placeholder="Email" onChange={this.handleEmailOnChange} name='email' value={this.state.email} /> <br/>
               <input type='text' placeholder="Password"onChange={this.handlePasswordOnChange} name="password" value={this.state.password} /> <br/>
               <button  >Submit</button>
             </form>}
          </>
        )
      }
    }



export default Signin