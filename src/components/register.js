import React from "react";
import './login.css';
import { BrowserRouter as Router, Routes, Route , Link} from "react-router-dom";
const Register = () =>{
return(

<React.Fragment>
      <div class="wrapper fadeInDown">
  <div id="formContent">
   
    <div class="fadeIn first">
      <img src="https://img.freepik.com/free-vector/account-login-line-icon-new-user-register-registration-concept-illustration_1948-2105.jpg" id="icon" alt="User Icon" />
    </div>


    <form>
      <input type="text" id="login" class="fadeIn second" name="Login" placeholder="Email"/>
      <input type="text" id="password" class="fadeIn third" name="password" placeholder="Password"/>
     
      
      <input type="submit" class="fadeIn fourth" value="Register"/>
    </form>

  
    <div id="formFooter">
     <Link to="/login">Login</Link>
    </div>

  </div>
</div>

    </React.Fragment>
)
}

export default Register;