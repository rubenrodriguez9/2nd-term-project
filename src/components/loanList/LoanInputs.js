import React, {useState, useEffect } from "react"
import axios from 'axios'
import {v4 as uuidv4} from "uuid"
import jwt_decode from "jwt-decode";
 



const LoanInputs = () => {




  let token = localStorage.getItem("jwtToken")
  let decoded = jwt_decode(token)
  
  const [debt, setDebt] = useState("")
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  

  

  const [loans, setLoans] = useState([])

  console.log(decoded);

  

  async function  handleSubmit  (){
   
    
    
    
      try{
       
      let  success = await axios.post("/api/loans/create-loan", {
              
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
       
      let  success = await axios.get("/api/loans/get-loans", {
        params: {
         user: token
        }
        })

           setLoans(success.data)
       
        

        


      } catch(e){
        console.log(e);

      }

      console.log("loans:", loans);


      

  }


  return (
    <div style={{textAlign: "center"}} >
      <button onClick={() => showLoans()}>Show Outstanding Loans</button>

      <ul>  
   
      {  loans.map((item) => {
          return (
            <li key={uuidv4()} style={{listStyle: "none" }} >
            {item.name}, {item.type}, {item.loan}
          </li>
          )
        })}
      </ul>
      <br/>

    <input placeholder="Debtor" type="text"  value={name} onChange={(e) => setName(e.target.value)} ></input>
    <input placeholder="Type" type="text" value={type} onChange={(e) => setType(e.target.value)} ></input>
    <input placeholder="Amount" type="text" value={debt} onChange={(e) => setDebt(e.target.value)} ></input>
    <button onClick={() => handleSubmit()} >Submit</button>





   

    
    </div>
  )
}

export default LoanInputs
