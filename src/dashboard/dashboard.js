import "./dashboard.css";
import axios from "axios";
import Am from "./components/graph1";
import LatestPurchases from "./components/latest_purchases";
import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from "react";
import OrderStatus from "./components/orderstatus";
import { BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";
export default function Dashboard() {
  
    const [maal, setmaal] = useState([]);
    const [orderid, setorderid] = useState(0);
    const [ isreadypur, setisreadypur] = useState(0);
    
    
    async function fetchorder(){

        var config = {
            method: 'get',
            url: 'https://apiv2.shiprocket.in/v1/external/orders/',
            headers: { 
              'Authorization': 'Bearer '+Cookies.get('token')
            }
          };
          
          await axios(config)
          .then(function (response) {
              setmaal(response);
              setisreadypur(1);
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  useEffect(()=>{
   
    fetchorder();

  },[]);
  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <img src="https://anonpe.com/img/2022logo.svg" />
        </div>

        <div className="profile">asd</div>
      </div>
      <div className="main-container">
        <div className="areamain1">
          <div className="sidebar">
            <div id="tools">
              <div className="section-name">TOOLS</div>
              <div className="topoptions">
                <li>Orders</li>
                <li></li>
              </div>
            </div>
            <div id="utilites">
              <div className="section-name">Track</div>
              <div className="topoptions">
              <li>By AWB</li>
                <li>By Order ID</li>
               
                <li>By Shipment Id</li>
              </div>
            </div>
            <div id="connectto">
              <div className="section-name">CONNECT TO</div>
              <div className="topoptions">
                <li>Telegram</li>
                <li>Google Analytics</li>
              </div>
            </div>
            <div id="connectto">
              <div className="section-name">PROFILE</div>
              <div className="topoptions">
                <li>Settings</li>
                <li>Log Out</li>
              </div>
            </div>
          </div>
        </div>
        <div class="areamain2">
          <div class="dashboard-container">
            <div className="area1">
              <div className="dashboard-box">
                <div className="boxheader">
                  <div className="boxvalue">INR 200</div>
                  <div className="boxname">Current Balance</div>
                </div>
              </div>

             <Am/>

             
            </div>
            <div className="area2">
              <div className="dashboard-box">
                <div className="boxheader">
                  <div className="boxvalue">Latest Purchases</div>
                  <div className="boxname">
                    This is a list of latest purchases
                  </div>
                </div>

                <div className="refresh-anonpe">
                  <button className="">Refresh</button>
                </div>
              </div>
              {isreadypur===1?
              <LatestPurchases data = {maal.data}/>:
              ""}
            </div>
            <div class="area3">
              <div className="salesbox">
                <div className="salesboxheader">
                  <div className="boxvalue">0</div>
                  <div className="boxname">New Products added this week</div>
                </div>
              </div>
              <div className="salesbox">
                <div className="salesboxheader">
                  <div className="boxvalue">300</div>
                  <div className="boxname">Total Vistors</div>
                </div>
              </div>
              <div className="salesbox">
                <div className="salesboxheader">
                  <div className="boxvalue">1000</div>
                  <div className="boxname">Total Purchases this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
