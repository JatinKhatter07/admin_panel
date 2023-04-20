import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {Link} from "react-router-dom"
import {useState,useEffect} from "react"
// import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios"
import "./products.css"
import { window } from 'browser-monads';


const Contacts = () => {

const [data,setData] = useState([]);


useEffect(() => {
  fetch('https://json-api-hjk4.onrender.com/data')
    .then(response => response.json())
    .then(data => setData(data));
}, []);


const handleDelete = (id) => {
  alert(`your product id is : ${id}`)
  fetch(`https://json-api-hjk4.onrender.com/data/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
    alert("Deleted Successfully")
    window.location.reload();
    })
    .catch(error => {
      console.log(error)
    });
};

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

//  console.log(data)
  return (
    <Box m="20px">
      <Header
        title="PRODUCTS"
        subtitle="List of All Products"
        
      />
      <h2>Products : {data.length}</h2>
      <h2><Link to="/add">List More Items</Link></h2>
      <Box 
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <div className="product_box">
        {data && data.map(item => (
      <div style={{height:"250px",width:"200px",display:"flex",flexDirection:"column",justifyContent: "center",
      alignItems: "center",border:"1px solid white",borderRadius:"10px"}} key={item.id}>
        <img src={item.images} alt="product images" height="100px" width="100px" />
        <h4 style={{fontSize:"15px"}}>{item.store_name}</h4>
        <p>{item.category}</p>
        <div style={{display:"flex",gap:"5px"}}>
          <button>Edit</button>
          <button onClick={()=>handleDelete(item.id)}>Delete</button>
        </div>
      </div>

    ))}
    </div>
      </Box>
    </Box>
  );
};

export default Contacts;
