import React, {useEffect, useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
import orga from '../../images/org.png';
export const checkLoginStatus = (setIsLoggedIn) => {
  const userIsLoggedIn =  true;
  setIsLoggedIn(userIsLoggedIn);
};
function LoginSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState("");
  
  useEffect(() => {
    checkLoginStatus(setIsLoggedIn);
  }, []);
  const fetchOrganizations = async () => {
    try {
      const response = await fetch("https://contact-hub-jrd9.onrender.com/organizations");
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error("Failed to fetch organizations:", data.error);
        return [];
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
      return [];
    }
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setGender("");
    setPhone_number("");
    setAddress("");
    setSelectedOrganization("");
  };

  useEffect(() => {
    const fetchAndSetOrganizations = async () => {
      const organizations = await fetchOrganizations();
      setOrganizationOptions(organizations);
    };

    fetchAndSetOrganizations();
  }, []);
  
  
  const Signup = async () => {
    try {
        // Check if an organization is selected
      if (!selectedOrganization) {
        setMessage("Please select an organization.");
        setTimeout(()=>{
          setMessage(null);
          
        }, 2000);
        return;

      }


      const response = await fetch("https://contact-hub-jrd9.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email,
          password,
          gender,
          phone_number,
          address,
          organization_id: selectedOrganization,
        }),
        mode: "cors", // Ensure CORS mode
        credentials: "include",
      });

      //handle error message in signyp
      const data = await response.json();
      if (response.ok) {
          setMessage("Signup successful! Redirecting to login...");
          console.log("Signup successful:", data);
          resetForm();
        
        Login();
        
      } else {
        setMessage(`Signup failed: ${data.error}`);
        console.error("Signup error:", data.error);
        setTimeout(()=>{
          setMessage(null);
          setPassword("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const Login = async () => {
    try {
      const response = await fetch("https://contact-hub-jrd9.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        
        console.log("login successful:", data);
        setIsLoggedIn(true); 
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/contacts");
        }, 2000);
      } else {
        setMessage(`Login failed: ${data.error}`);
        console.error("Login error:", data.error);
        setTimeout(()=>{
          setMessage(null);
          setPassword("");
        }, 2000);

      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="header">
      <h5 style={{ fontSize: '34px', color: 'purple', fontWeight: 'bold' , marginTop:'15px'}}>The Contact Hub</h5>
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="" /><p className="req">*</p>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
            />
          </div>
        )}

        
        {action === "Login" ? null : (
          <>
            <div className="input">
                <label htmlFor="organization"> <img src={orga} alt="" /> </label><p className="req">*</p>
                <select style={{width:'50%', height:'50%', backgroundColor:'lightgrey', borderRadius:'4px',margin:'12px'}}
                    id="organization"
                    onChange={(e) => setSelectedOrganization(e.target.value)}
                    value={selectedOrganization}
                    required
                  >
                    <option value="" disabled>
                      Select an organization
                    </option>
                  
                    {/* Fetch and map organizations from the backend to options */}
                    {organizationOptions.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                 </select>
          </div>
          <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
          </div>
          <div className="input">
            <img src={user_icon} alt="" /><p className="req">*</p>
            <input
                type="number"
                placeholder="Phone Number: Digits(0-9,+)9"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" />
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          </>
        )}
          <div className="input">
            <img src={email_icon} alt="" /><p className="req">*</p>
            <input
              type="email"
              placeholder="Email: c@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" /><p className="req">*</p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password: Characters(Aa1)8 "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            ></span>
            
          </div>
        </div>
        <div className="message"  style={{ color: 'green',fontWeight: 'bold' }}>{message}</div>

        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Sign Up");
              Signup();
            }}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Login");
              Login();
            }}
          >
            Login
          </div>
        </div>
    </div>
  );
}

export  default LoginSignup;
