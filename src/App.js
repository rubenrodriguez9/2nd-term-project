import './App.css';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Span.css"

class App extends Component {


state = {
  loanList:[
    { id: uuidv4(),
      loanType: "Car",
      amount: "8000",
      name: "Ruben Rodriguez"
    },
    { id: uuidv4(),
      loanType: "Home",
      amount: "150000",
      name: "Kilo Ren"
    },
    { id: uuidv4(),
      loanType: "Personal",
      amount: "2500",
      name: "Elzhi"
    },
  ],
  debtor: "",
  loanTypeInput: "",
  loanAmount: ""


}



handleLoanTypeInputOnChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
  console.log(this.state);
}
handleDebtorOnChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
  console.log(this.state);
}
handleLoanAmountOnChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
  console.log(this.state);
}

handleAddLoanOnClick = () => {
    let obj = [...this.state.loanList, {id: uuidv4(), loanType: this.state.loanTypeInput, name: this.state.debtor }]

    this.setState({
      loanList: obj,
      debtor: "",
      loanTypeInput: "",
      loanAmount: ""

    })
    
    console.log(obj);
}


  render() {
    const {loanList, debtor, loanTypeInput, loanAmount} = this.state
    return (
      <div style={{textAlign: "center", listStyle: "none"}} >

        <input onChange={(event) => this.handleDebtorOnChange(event)} type="text" placeholder="Name" name="debtor" value={debtor} />
        <input onChange={(event) => this.handleLoanTypeInputOnChange(event)} type="text" placeholder="Loan Type" name="loanTypeInput" value={loanTypeInput}/>
        <input onChange={(event) => this.handleLoanAmountOnChange(event)} type="text" placeholder="Value" name="loanAmount" value={loanAmount} />
        
        <span className='span-class add-loan' onClick={this.handleAddLoanOnClick}
          
        >Add Loan</span>
        <ul>



            {loanList.map(({id, loanType, amount,  name}) => {
              return <li key={id}   >
                <span className='span-class pay'
                  

                 >Pay</span>
                <span className='span-class interest' >Interest</span>
                <span className="span-class delete" >Delete</span>
                
                <div> {name} </div>
                <div> {loanType} </div>
                <div> {"$" +amount} </div>
                <br/>
                <br/>

               
              </li>
            })}
          
        </ul>
        
      </div>
    );
  }
}

export default App;