import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";
import Ssax from "../../components/maps";
const OrderStatus = (props) =>{
    let abcx = useParams();
    const [datax, setdatax] = useState([]);
    const [pd, setpd]  =useState([]);
    const [sid, setsid]  =useState({});
    const [coor , setcoor] = useState([]);
  
     function getedd(sidx){

        let headersList = {
            "Authorization": "Bearer " + Cookies.get('token')
           }
           
           let reqOptions = {
             url: "https://apiv2.shiprocket.in/v1/external/courier/track/shipment/"+sidx,
             method: "GET",
             headers: headersList,
           }
           
         axios.request(reqOptions).then(function (response) {
             
             
           })

   
        }
    
    useEffect(()=>{
        
            async function getorderstatus(callback){

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
                     setsid(response.data.data.shipments);
                     
                    setcoor({lat:response.data.data.pickup_address.lat, lon:response.data.data.pickup_address.long});
                   // console.log(coor);
                     try{

                     setsid(response.data.data.shipments);
    
                     }
                     catch(e){
                        
                     }
                    //  console.log(response.data.data.shipments.id);
                   })
                   
            }

        getorderstatus(getedd);
        
    },[]);

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
      <tbody>
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
Shipment Id
           </td>
           <td>
{sid.id}
           </td>
         
       </tr>
       <tr>
           <td>
Pickup Address Realtime Location:
           </td>
           <td>
       
           </td>
         
       </tr>
       </tbody>
   </table>


   <Ssax coordinates={coor}/>
  </div>
</div>
 
        
        </>
    )

}

export default OrderStatus;