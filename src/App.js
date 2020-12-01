import './App.css';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Span.css"

class App extends Component {


state = {
  loanList:[
    { id: uuidv4(),
      loanType: "Car",
      amount: 8000,
      name: "Ruben Rodriguez",
      payToggle: false
    },
    { id: uuidv4(),
      loanType: "Home",
      amount: 150000,
      name: "Kilo Ren",
      payToggle: false
    },
    { id: uuidv4(),
      loanType: "Personal",
      amount: 2500,
      name: "Elzhi",
      payToggle: false
    },
  ],
  debtor: "",
  loanTypeInput: "",
  loanAmount: "",
  pay: '',
  errorToggle: false,
  errorMessage: ''
  


}



handleLoanTypeInputOnChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}
handleDebtorOnChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}
handleLoanAmountOnChange = (event) => {


  this.setState({
    [event.target.name]: event.target.value
  })

  console.log(typeof this.state.loanAmount);

}

handleAddLoanOnClick = () => {

    let obj = [...this.state.loanList, {id: uuidv4(), loanType: this.state.loanTypeInput, amount: Number(this.state.loanAmount), name: this.state.debtor, payToggle: false }]

    this.setState({
      loanList: obj,
      debtor: "",
      loanTypeInput: "",
      loanAmount: ""

    })
    
    console.log(obj);
}


handleDeleteOnClick = (targetID) => {
 let arr = [...this.state.loanList].filter((item) => {
  return  targetID !== item.id

 })

this.setState({
  loanList: arr
})
 


}

handlePayOnClick =  (targetID) => {
  let arr = [...this.state.loanList]
  let newArr = arr.map((item) => {
    if(targetID === item.id){
      item.payToggle = true
    }
   return item
   
  })

  this.setState({
    loanList: newArr
  })
  
 
  
  
}
handlePayOnChange = (event) => {


  this.setState({
    [event.target.name]: event.target.value
  })
  


  

  
}

transact = (targetID) => {

  console.log(targetID);

  let arr = [...this.state.loanList].map((item) => {
   if(targetID === item.id){
     item.amount = (Number(item.amount) - Number(this.state.pay)).toString()
    
     return item
   }else return item
    
  })

  this.setState({
    loanList: arr,
    pay : ''
  })

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



            {loanList.map(({id, loanType, amount,  name, payToggle}) => {
              return <li key={id}   >

                {payToggle ? <input type="text" name='pay' value={this.state.pay} placeholder="Pay Value" onChange={(event) => this.handlePayOnChange(event)}  /> : <span className='span-class pay'
                  onClick={() => this.handlePayOnClick(id)}
                 >Pay</span>}

                 {payToggle ? <span className='span-class pay' onClick={() => this.transact(id)} >Transact</span> : null}
                

                <span className='span-class interest' 
                >Interest</span>

                <span className="span-class delete"
                  onClick={() => this.handleDeleteOnClick(id)}
                >Delete</span>
                
                <div> {name} </div>
                <div> {loanType} </div>
                <div> $ {amount} </div>
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