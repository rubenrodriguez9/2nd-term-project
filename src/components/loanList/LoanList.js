
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';



import LoanListView from "./LoanListView"
class LoanList extends Component {


state = {
  loanList:[
    { id: uuidv4(),
      loanType: "Car",
      amount: 8000,
      name: "Ruben Rodriguez",
      payToggle: false,
      interestToggle: false
    },
    { id: uuidv4(),
      loanType: "Home",
      amount: 150000,
      name: "Kilo Ren",
      payToggle: false,
      interestToggle: false
    },
    { id: uuidv4(),
      loanType: "Personal",
      amount: 2500,
      name: "Elzhi",
      payToggle: false,
      interestToggle: false
    },
  ],
  debtor: "",
  loanTypeInput: "",
  loanAmount: "",
  pay: '',
  errorToggle: false,
  errorMessage: '',
  interestAmount: "0"
  


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

  

  let arr = [...this.state.loanList].map((item) => {
   if(targetID === item.id){
     item.amount = (Number(item.amount) - Number(this.state.pay)).toString()
     item.payToggle = false
    
   }
   return item
    
  })
  this.setState({
    loanList: arr,
    pay : ''
  })
}

handleInterestOnClick = (targetID) => {
  console.log('hello');
  let arr = [...this.state.loanList].map((item) => {
    if(targetID === item.id){
      item.interestToggle = true
    }
    return item
  })

  this.setState({
    loanList: arr
  })
}
handleInterestOnChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  }, () => console.log(this.state.interestAmount)
  
  )

  


}

addInterest = (targetID) => {
  let arr = [...this.state.loanList].map((item) => {
    if(targetID === item.id){
      
      let principle = Number(item.amount)
      let rate = Number(this.state.interestAmount) / 100
      let time = 1

      let calculatedInterestPlusPrinciple = principle * (1 + (rate * time))
      item.amount = calculatedInterestPlusPrinciple
      item.interestToggle = false

    }
    return item
  })

  this.setState({
    loanList: arr,
    interestAmount:""
  })
}



  render() {
    const { debtor, loanTypeInput, loanAmount} = this.state
    return (
      <div style={{textAlign: "center", listStyle: "none"}} >

        <input onChange={(event) => this.handleDebtorOnChange(event)} type="text" placeholder="Name" name="debtor" value={debtor} />
        <input onChange={(event) => this.handleLoanTypeInputOnChange(event)} type="text" placeholder="Loan Type" name="loanTypeInput" value={loanTypeInput}/>
        <input onChange={(event) => this.handleLoanAmountOnChange(event)} type="text" placeholder="Value" name="loanAmount" value={loanAmount} />
        
        <span className='span-class add-loan' onClick={this.handleAddLoanOnClick}
          
        >Add Loan</span>
        
        <LoanListView
        loanList={this.state.loanList}
        handlePayOnChange={this.handlePayOnChange}
        handlePayOnClick={this.handlePayOnClick}
        pay={this.pay}
        transact={this.transact}
        handleInterestOnClick={this.handleInterestOnClick}
        interestAmount={this.state.interestAmount}
        handleInterestOnChange={this.handleInterestOnChange}
        addInterest={this.addInterest}
        
        />

        
      </div>
    );
  }
}

export default LoanList;