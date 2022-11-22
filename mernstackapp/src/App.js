import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import BasicTable from "./Table";

const initialform = {
  amount: 0,
  detail: "",
  date:"",
};


function App() {
  
 
  const [formvalue, setformvalue] = useState(
   initialform
   );
  const [transactions, setTransaction] = useState([]);
  const [search,setSearch]=useState("")
  const [edittransaction,setEdittransaction]=useState({})
  useEffect(()=>{
     if(edittransaction != {}){
      setformvalue(edittransaction)
      
     }
  },[edittransaction])
  useEffect(() => {
    fetchtransaction();
  }, []);
 
 /*const formdate=(newValue)=>{
    setformvalue({...formvalue,date: newValue})

  }*/


  const fetchtransaction = async () => {
    const res = await fetch("http://localhost:8082/spendings");
    const { data } = await res.json();
    console.log(data);
    setTransaction(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formvalue);
    const res = await fetch("http://localhost:8082/spendings", {
      method: "POST",
      body: JSON.stringify(formvalue),
      headers: {
        "content-type": "application/JSON",
      },
    });
    const data = await res.json();
    if (res.ok) {
      fetchtransaction();
      setformvalue(initialform);
    }
  };
  const handleInput = (e) => {
    setformvalue({ ...formvalue, [e.target.name]: e.target.value });
  };
  return (
    <>
    
      <Navbar setSearch={setSearch}/>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'whitesmoke'}}>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="number"
            name="amount"
            onChange={handleInput}
            value={formvalue.amount}
            placeholder="enter your amount"
          />
          <input
            type="text"
            name="detail"
            onChange={handleInput}
            value={formvalue.detail}
            placeholder="describe your detail"
          />
          <input
            name="date"
            onChange={handleInput}
            value={formvalue.date}
            type="date"
          />
          {edittransaction.amount !=={} && (<button type="submit">submit</button>)}
          {edittransaction.amount =={} && (<button type="submit">update</button>)}
          
        </form>
      </div>
        <BasicTable setEdittransaction={setEdittransaction} fetchtransaction={fetchtransaction} search={search} transactions={transactions}/>
      
    </>
  );
}

export default App;
