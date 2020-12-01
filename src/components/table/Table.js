import React, { Component } from 'react'

export default class table extends Component {
    render() {
        return (
            <table className="table span-class" >
                  <tr>
                    <td  >{name}</td>
                  </tr>
                  <tr>
                    <td  > Loan Type: {loanType}</td>
                  </tr>
                  <tr>
                    <td  > Amount: {amount}</td>
                  </tr>
                  <tr>
                    <td  >Interest {interest}</td>
                  </tr>
                </table>
        )
    }
}
