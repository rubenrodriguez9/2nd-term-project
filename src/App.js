import './App.css';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Span.css"
import Span from './components/span/Span';


class App extends Component {


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

  console.log(targetID);

  let arr = [...this.state.loanList].map((item) => {
   if(targetID === item.id){
     item.amount = (Number(item.amount) - Number(this.state.pay)).toString()
     item.payToggle = false
    
     return item
   }else return item
    
  })

  this.setState({
    loanList: arr,
    pay : ''
  })

}

handleInterestOnClick = (targetID) => {
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

      console.log(item)
    }
    return item
  })

  this.setState({
    loanList: arr,
    interestAmount:""
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
        <ul style={{listStyleType: "none"}}  >



            {loanList.map(({id, loanType, amount,  name, payToggle, interestToggle}) => {
              return <li key={id}  >
                
                {/* turns pay span to an input to enter a pay value  */}
                {payToggle ?
                 <input type="text" name='pay' value={this.state.pay} placeholder="Pay Value" onChange={(event) => this.handlePayOnChange(event)}  
                  /> : 
                  <Span className="span-class pay" onClick={() => this.handlePayOnClick(id)} value="Pay"/>}

                {/* creates a Transact button when pay is clicked */}
                {payToggle ? <Span className="span-class pay" onClick={() => this.transact(id)} value="Transact" 
                  /> : null}

                {/* creates an input to place an interest value*/}
                {interestToggle ? 
                <input onChange={(event) =>this.handleInterestOnChange(event)} placeholder="Enter annual APR" type="text" name="interestAmount" 
                value={this.state.interestAmount} 
                /> : 
                <Span className='span-class interest' onClick={() => this.handleInterestOnClick(id)} value="Interest" />}

                {/* creates a span to add interest  */}
                {interestToggle ?  <Span
                  className={'span-class interest' }
                  onClick={() => this.addInterest(id)}
                  value="Add Interest"
                  /> :  null}

                  
                <Span 
                  value="Delete"
                  className="span-class delete"
                  onClick={() => this.handleDeleteOnClick(id)}
                />
                
                <div> {name} </div>
                <div> {loanType} </div>
                <div> $ {amount} </div>
                <br/>
               

               
              </li>
            })}
          
        </ul>
        
      </div>
    );
  }
}

export default App;