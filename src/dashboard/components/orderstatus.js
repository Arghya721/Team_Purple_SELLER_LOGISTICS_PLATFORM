import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Ssax from "../../components/maps";
const OrderStatus = (props) => {

  let abcx = useParams();
  console.log(abcx);
  const [datax, setdatax] = useState([]);
  const [pd, setpd] = useState([]);
  const [sid, setsid] = useState({});
  const [coor, setcoor] = useState([]);

  function getedd(sidx) {
    let headersList = {
      Authorization: "Bearer " + Cookies.get("token"),
    };

    let reqOptions = {
      url:
        "https://apiv2.shiprocket.in/v1/external/courier/track/shipment/" +
        sidx,
      method: "GET",
      headers: headersList,
    };

    axios.request(reqOptions).then(function (response) {});
  }

  useEffect(() => {
    Loading.standard();
    async function getorderstatus(callback) {
      let headersList = {
        Authorization: "Bearer " + Cookies.get("token"),
      };
      let reqOptions = {
        url:
          "https://apiv2.shiprocket.in/v1/external/orders/show/" + abcx.topicId,
        method: "GET",
        headers: headersList,
      };

      await axios.request(reqOptions).then(function (response) {
        setdatax(response.data.data.products);
        setpd(response.data.data);
        setsid(response.data.data.shipments);

        setcoor({
          lat: response.data.data.pickup_address.lat,
          lon: response.data.data.pickup_address.long,
        });
        // console.log(coor);
        try {
          setsid(response.data.data.shipments);
        } catch (e) {}
        //  console.log(response.data.data.shipments.id);
      });
    }

    getorderstatus(getedd);
    Loading.remove();


  }, [abcx]);

  return (

 <>
    
      <table className="table-anonpe-purchases">
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
          {datax.map((element, index) => {
            return (
              <tr>
                <td key={index}>
                  {element.name}
                  <br />
                  <br />
                </td>
                <td> {element.quantity}</td>

                <td> {element.order_id}</td>
                <td> INR {element.cost}</td>
                <td>
                  <button>{pd.status}</button>
                </td>
                {/* <td> <Link to={"/dashboard/orderstatus/"+element.id}><button>View Status</button> </Link></td> */}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div class="container">
        <div class="row justify-content-center">
          <div class="col">
            <p>
              <a
                class="btn btn-primary"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                More Information
              </a>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body" style={{ border: "none" , "min-width" : "max-content" }}>
                <table className="table table-dark table-striped">
                  <tbody>
                    <tr>
                      <td>Customer Name:</td>
                      <td>{pd.customer_name}</td>
                    </tr>
                    <tr>
                      <td>Customer Address:</td>
                      <td>{pd.customer_address}</td>
                    </tr>
                    <tr>
                      <td>Customer Pincode:</td>
                      <td>{pd.delivery_code}</td>
                    </tr>
                    <tr>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224090.76384583014!2d76.953179692267!3d28.647194765069948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1648400449410!5m2!1sen!2sin" width="200" height="200" style={{"border":"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </tr>
                  </tbody>
                </table>
                <h2>Billing Details</h2>
                <table className="table table-dark table-striped">
                  <tbody>
                    <tr>
                      <td>Billing Name:</td>
                      <td>{pd.billing_name}</td>
                    </tr>
                    <tr>
                      <td>Billing City:</td>
                      <td>{pd.billing_city}</td>
                    </tr>
                    <tr>
                      <td>Billing Email:</td>
                      <td>{pd.billing_email}</td>
                    </tr>
                    <tr>
                      <td>Billing Phone:</td>
                      <td>{pd.billing_phone}</td>
                    </tr>
                    <tr>
                      <td>Billing Address:</td>
                      <td>{pd.billing_address}</td>
                    </tr>
                    <tr>
                      <td>Billing Pincode:</td>
                      <td>{pd.billing_pincode}</td>
                    </tr>

                  </tbody>
                </table>





              </div>
            </div>
          </div>
          <div class="col">
            <p>
              <a
                class="btn btn-primary"
                data-bs-toggle="collapse"
                href="#mapcollaspe"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Show on Maps
              </a>
            </p>
            <div class="collapse" id="mapcollaspe">
              <div class="card card-body" style={{ border: "none" }}>
                <Ssax coordinates={coor} />
              </div>
            </div>
          </div>
     
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
