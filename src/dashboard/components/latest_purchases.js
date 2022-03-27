import React from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
const LatestPurchases = (props) => {

    const {data} = props.data;
  
    return (
    
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
          {
                data.map(element => {
                    return(
                    <tr>
                    <td>
                     {element.customer_name}
                      <br />
                      <sub>{element.customer_email} </sub>
                    </td>
                    <td> {element.id}</td>
                    <td> <Link to={"/dashboard/orderstatus/"+element.id}><button>View Status</button> </Link></td>
                  </tr>
                    )
                })
          }
           
          </tbody>
        </table>
      </>
    );
  };
  
  export default LatestPurchases;
  