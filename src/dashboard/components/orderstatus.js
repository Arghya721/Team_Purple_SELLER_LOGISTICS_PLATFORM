import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Edd from "./edd";
import { BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";

const OrderStatus = (props) =>{
    let abcx = useParams();
    const [datax, setdatax] = useState([]);
    const [pd, setpd]  =useState([]);
    async function getorderstatus(){

        let headersList = {
            "Authorization": "Bearer " + Cookies.get('token')
           }
           
           let reqOptions = {
             url: "https://apiv2.shiprocket.in/v1/external/orders/show/"+abcx.topicId,
             method: "GET",
             headers: headersList,
           }
           
        await axios.request(reqOptions).then(function (response) {
             
             setdatax(response.data.data.products);
             setpd(response.data.data);
           })

    }
    
    useEffect(()=>{
        getorderstatus();
    },[])

    return(
        <>
    
         
          
           
        <table class="table-anonpe-purchases">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Order Id</th>
              
              <th>Cost</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
          {
                datax.map((element, index) => {
                    return(
                    <tr>
                    <td key={index}>
                    {element.name}
                      <br />
                     <br/>



                    </td>
                    <td> {element.quantity}</td>
                    
                    <td> {element.order_id}</td>
                    <td> INR {element.cost}</td>
                    <td><button>{pd.status}</button></td>
                    {/* <td> <Link to={"/dashboard/orderstatus/"+element.id}><button>View Status</button> </Link></td> */}
                  </tr>
                  
                    );
                   
                })
          }
          
          </tbody>
        </table>
        <p>
  <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          More Information
  </a>
  
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body" style={{"border":"none"}}>
  <table>
       <tr>
           <td>
Customer Name:
           </td>
           <td>
{pd.customer_name}
           </td>
         
       </tr>
       <tr>
           <td>
Customer Address:
           </td>
           <td>
{pd.customer_address}
           </td>
         
       </tr>
       <tr>
           <td>
Customer Pincode:
           </td>
           <td>
           {pd.delivery_code}
           </td>
         
       </tr>
       <tr>
           <td>
Pickup Location:
           </td>
           <td>
{pd.delivery_code}
           </td>
         
       </tr>
       <tr>
           <td>
Estimated Delivery Date:
           </td>
           <td>
             {/* {console.log(pd.shipments.id)} */}
{/* <Edd id = {"asdas"}/> */}
           </td>
         
       </tr>
   </table>
  </div>
</div>
 
        
        </>
    )

}

export default OrderStatus;