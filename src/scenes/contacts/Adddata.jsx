import {React,useState,useEffect} from "react";

const Adddata=()=>{
const [inputs,setInputs] =useState({});
const [newItems,setNewItems] =useState({});



const handleChange=(event)=>{

    const store_name = event.target.name;
    const images = event.target.value;
    setInputs(values => ({...values, [store_name]: images}))
  }


const handleSubmit =(e)=>{
    e.preventDefault()
    fetch(`https://json-api-hjk4.onrender.com/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItems)
      })
        .then(response => {
  
          setInputs([...inputs, newItems]);
          setNewItems({ store_name: '', images: '' });
          alert("Data posted successfully")
        }) .catch(error => {
       console.log(error)
        });
  
}



return (

<div>
<form onSubmit={handleSubmit}>
      <label>Enter your store_name:
      <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter image url:
        <input 
          type="url" 
          name="age" 
          value={inputs.age || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
</div>


)
}

export default Adddata;