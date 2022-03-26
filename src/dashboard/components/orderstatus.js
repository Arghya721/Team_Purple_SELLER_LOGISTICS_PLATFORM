import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";

const OrderStatus = (props) =>{
    let abcx = useParams();
    
    async function getorderstatus(){

        let headersList = {
            "Authorization": "Bearer " + Cookies.get('token')
           }
           
           let reqOptions = {
             url: "https://apiv2.shiprocket.in/v1/external/orders/show/"+abcx.topicId,
             method: "GET",
             headers: headersList,
           }
           
           axios.request(reqOptions).then(function (response) {
             console.log(response.data);
           })

    }
    useEffect(()=>{
        getorderstatus();
    })

    return(
        <>
        
        <table class="table-anonpe-purchases">
          <thead>
            <tr>
              <th>Name</th>
              <th>Order Status</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
          {/* {
                data.map(element => {
                    return(
                    <tr>
                    <td>
                     {element.customer_name}
                      <br />
                      <sub>{element.customer_email} </sub>
                    </td>
                    <td> {element.id}</td>
                    <td> </td>
                  </tr>
                    )
                })
          }
            */}
          </tbody>
        </table>
        </>
    )

}

export default OrderStatus;