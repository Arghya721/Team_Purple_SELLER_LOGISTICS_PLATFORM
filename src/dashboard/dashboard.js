import "./dashboard.css";
import axios from "axios";
import LatestPurchases from "./components/latest_purchases";
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import OrderStatus from "./components/orderstatus";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Logo from "../img/logo.svg";
import Back from "../img/background.svg";
export default function Dashboard() {

  const navigate = useNavigate();


  const [maal, setmaal] = useState([]);
  const [isreadypur, setisreadypur] = useState(0);
  const [id, setid] = useState(1);
  const params = useParams();
  //console.log(params);

  async function fetchorder(id) {
    Loading.pulse();
    var config = {
      method: 'get',
      url: 'https://apiv2.shiprocket.in/v1/external/orders/?page=' + id,
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('token')
      }
    };

    await axios(config)
      .then(function (response) {

        setmaal(response);
        setisreadypur(1);


      })
      .catch(function (error) {

      });
    Loading.remove();
  }

  useEffect(() => {

    fetchorder(id);


  }, []);

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <img src={Logo} style={{ "width": "75px" }} />
        </div>
          
        <div className="profile"></div>

      </div>
      <div className="main-container">
        <div className="areamain1">
          <div className="sidebar">
          <div id="connectto">
            
            <div className="section-name">SHIPMENT ID</div>
            <div style={{"display": "flex",
  "flex-direction": "column"}}>
            <input name="shipment" onChange={(e)=>{
              if(e.target.value!=""){

              navigate(`/dashboard/shipment/${e.target.value}`)
            }}}></input></div>
            </div>

            <div id="connectto">
              <div className="section-name">ORDER ID</div>
              <div style={{"display": "flex",
    "flex-direction": "column"}}>
              <input name="shipment" onChange={(e)=>{
                if(e.target.value!=""){

                navigate(`/dashboard/orderstatus/${e.target.value}`)
              }}}></input></div>
              <div className="topoptions">
                <li onClick={() => {
                  Cookies.remove('token');
                  navigate('/');
                }}>Log Out</li>
              </div>
            </div>
          </div>
        </div>
        <div class="areamain2">
          <div class="dashboard-container">
            <div className="area1">{
              params.topicId === "shipment" ? <h1>This is Shipment</h1> : params.topicId === "orderstatus" ? <OrderStatus id={params.topicId} /> : <><h1><img src={Back} style={{"width" : "100%" , "padding":"20px"}}></img></h1></>
            }
            </div>
            <div className="area2">
              <div className="dashboard-box">
                <div className="boxheader">
                  <div className="boxvalue">Latest Purchases</div>
                  <div className="boxname">
                    This is a list of latest purchases
                  </div>
                  <div style={{
                    "display": "flex",
                    "flex-direction": "column",
                  "justify-content": "center",
                  "flex-wrap": "nowrap",
                  "align-items": "flex-start",
    "width": "100%"}}>
                  <div>
                    {isreadypur === 1 ? (maal.data.meta.pagination.current_page < maal.data.meta.pagination.total_pages ? <button onClick={() => {
                      fetchorder(id + 1);
                      setid(id + 1);
                    }}>Next Page</button> : "") : "sd"
                    }

                    {isreadypur === 1 ? (maal.data.meta.pagination.current_page > 1 ? <button onClick={() => {
                      fetchorder(id - 1);
                      setid(id - 1);
                    }}>Previous page</button> : "") : "sd"
                    }

                  </div>
                  <div>
                    {isreadypur === 1 ? maal.data.meta.pagination.current_page : ""} of {isreadypur === 1 ? maal.data.meta.pagination.total_pages : ""}
                  </div>
                </div>

              </div>

              <div className="refresh-anonpe">
                <button onclick={() => {
                  fetchorder(id);
                }} className="">Refresh</button>
              </div>
            </div>
            {isreadypur === 1 ?
              <LatestPurchases data={maal.data} /> :
              ""}
          </div>



        </div>
      </div>
    </div>
      </div >
    
  );
}
