import React, { Component } from 'react'
import Link from 'react-router-dom'
 class Nav extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link  >Home</Link>
                </li>
                <li>
                    <Link>Register</Link>
                </li>
            </ul>
        )
    }
}

export default Nav