import jwtDecode from 'jwt-decode'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
 class Nav extends Component {


 state = {
  isAuth: false,
  user: null,
}


   


componentDidMount ()  {

    let token = localStorage.getItem('jwtToken')


    if(token){

        let decoded = jwtDecode(token)
        let currentTime = Date.now() / 1000
        if(decoded.exp < currentTime){
            localStorage.removeItem("jwtToken")
        } else

  this.setState({
    isAuth: true,
      user: {
          email: decoded.email,
          _id: decoded._id
      }
        }, () => console.log(this.state))
    }
}

componentDidUpdate (prevState, prevProps) {
    // if(this.props.user !== prevState.user){
    //     this.setState({
    //         isAuth: this.props.isAuth,
    //         user: {
    //             email: this.props.user,
    //             _id: this.props._id
    //         }
    //     })
    // }

}

 logout = () => {
        localStorage.removeItem('jwtToken')
        this.setState({
            isAuth: false,
            user: null
        })
    }




    render() {

        let nav;

        

        if(this.state.user !== null){
            nav = (
                <ul>
                <li>
                    <Link to="/profile"  >{this.state.user.email}</Link>
                </li>
                <li>
                    <Link to="/logout" onClick={this.logout} >Logout</Link>
                </li>
            </ul>
            )
        }else nav = (
            <ul>
                <li>
                    <Link to="/sign-in"  >Sign in</Link>
                </li>
                <li>
                    <Link to="/sign-up"  >Register</Link>
                </li>
            </ul>
        )



        return (
            <>

            {nav}
            </>
        )
    }
}

export default Nav