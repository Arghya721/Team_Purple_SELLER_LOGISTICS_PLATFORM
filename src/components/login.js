import React, { useState } from "react";
import './login.css';
import { BrowserRouter as Router, Routes, Route , Link} from "react-router-dom";
var axios = require('axios');


const Login = () =>{
    const [error, setError] = useState(0);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    function handleLogin(event){
        event.preventDefault();
    var data = JSON.stringify({
        "email": email,
        "password": password
      });
      
      var config = {
        method: 'post',
        url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {

        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    }
return(

<React.Fragment>
      <div class="wrapper fadeInDown">
  <div id="formContent">
      {error==1?
  <div className="alert alert-danger">sads</div>:
  ""}
    <div class="fadeIn first">
      <img src="https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png" id="icon" alt="User Icon" />
    </div>


    <form onSubmit={handleLogin}>
        
      <input type="text" id="login" class="fadeIn second" name="Login" onChange={(e)=>{
          setEmail(e.target.value);
      }
      } placeholder="Email"/>
      <input type="text" id="password" class="fadeIn third" name="password" onChange={(e)=>{
          setPassword(e.target.value);
      }
      }
      placeholder="Password"/>
      <input type="submit" class="fadeIn fourth" value="Log In"/>

      
    </form>

  
    <div id="formFooter">
     <Link to="/register">Registration</Link>
    </div>

  </div>
</div>

    </React.Fragment>
)
}

export default Login;