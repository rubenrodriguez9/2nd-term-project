import React, {useState, useEffect } from "react"
import axios from 'axios'
import {v4 as uuidv4} from "uuid"


 



const LoanInputs = () => {




  let token = localStorage.getItem("jwtToken")

  
  const [debt, setDebt] = useState("")
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  

  

  const [loans, setLoans] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  console.log(loans);

  

  async function  handleSubmit  (){
   
    
    
    
      try{
       
      let  success = await axios.post("http://localhost:3001/api/loans/create-loan", {
              
                debt:debt,
                name:name,
                type: type,
                user:token
                
            })

          

      } catch(e){
        console.log(e);

      }
    



  }

  async function showLoans(){

    try{
       
      setIsLoading(true)

      let  success = await axios.get("http://localhost:3001/api/loans/get-loans", {
        params: {
         user: token
        }
        })

        console.log(success);
           setLoans(success.data)
       
        setIsLoading(false)

        


      } catch(e){
        console.log(e);
        setIsLoading(false)

      }

      console.log("loans:", loans);


      

  }

  function loadList() {
    return (
      <ul>  
   
      {  loans.map((item) => {
          return (
            <li key={uuidv4()} style={{listStyle: "none" }} >
            {item.name}, {item.type}, {item.loan}
          </li>
          )
        })}
      </ul>
    )
  }


  return (
    <div style={{textAlign: "center"}} >
      <button onClick={() => showLoans()}>Show Outstanding Loans</button>

      {
       isLoading ? <h1>...Loading</h1> :loadList()
      }
      <br/>

    <input placeholder="Debtor" type="text"  value={name} onChange={(e) => setName(e.target.value)} ></input>
    <input placeholder="Type" type="text" value={type} onChange={(e) => setType(e.target.value)} ></input>
    <input placeholder="Amount" type="text" value={debt} onChange={(e) => setDebt(e.target.value)} ></input>
    <button onClick={() => handleSubmit()} >Submit</button>





   

    
    </div>
  )
}

export default LoanInputs
