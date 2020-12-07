import React from 'react'
import Span from '../span/Span';

 const LoanListView = ({loanList, handlePayOnChange, handlePayOnClick, pay, transact, handleInterestOnClick, handleDeleteOnClick , addInterest, interestAmount, handleInterestOnChange}) => {

   const loanListHandlePayOnClick = (id) => {
    handlePayOnClick(id)
   }

   const loanListHandlePayOnChange = (event) => {
       handlePayOnChange(event)

   }

  const loanListHandleTransact = (id) => {
    transact(id)
  }

  const loanListHandleInterestOnClick = (id) => {
      console.log();
    handleInterestOnClick(id)
  }

  const loanListHandleInterestOnChange = (event) => {
    handleInterestOnChange(event)
  }

  const LoanlistAddInterest = (id) => {
    addInterest(id)

  }

  const loanListHandleDeleteOnClick = (id) => {
    handleDeleteOnClick(id)
  }
  
     return (
        <ul style={{listStyleType: "none"}}  >



            {loanList.map(({id, loanType, amount,  name, payToggle, interestToggle, handleInterestOnClick}) => {
              return <li key={id}  >
                
                {/* turns pay span to an input to enter a pay value  */}
                {payToggle ?(
                 <input type="text" name='pay' value={pay} placeholder="Pay Value" onChange={(event) => loanListHandlePayOnChange(event)}  
                  />) : 
                 ( <Span className="span-class pay" onClick={() => loanListHandlePayOnClick(id)} value="Pay"/>)}

                {/* creates a Transact button when pay is clicked */}
                {payToggle ? (<Span className="span-class pay" onClick={() => loanListHandleTransact(id)} value="Transact" 
                  /> ): null}

                {/* creates an input to place an interest value*/}
                {interestToggle ? (
                <input onChange={(event) =>loanListHandleInterestOnChange(event)} placeholder="Enter annual APR" type="text" name="interestAmount" 
                value={interestAmount} 
                /> ): (
                <Span className='span-class interest' onClick={() => loanListHandleInterestOnClick(id)} value="Interest" />)}

                {/* creates a span to add interest  */}
                {interestToggle ?  <Span
                  className={'span-class interest' }
                  onClick={() => LoanlistAddInterest(id)}
                  value="Add Interest"
                  /> :  null}

                  
                <Span 
                  value="Delete"
                  className="span-class delete"
                  onClick={() => loanListHandleDeleteOnClick(id)}
                />
                
                <div> {name} </div>
                <div> {loanType} </div>
                <div> $ {amount} </div>
                <br/>
               

               
              </li>
            })}
          
        </ul>
    )
}


export default LoanListView
