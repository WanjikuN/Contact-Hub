import React, {useEffect, useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
export const checkLoginStatus = (setIsLoggedIn) => {
  const userIsLoggedIn =  true;
  setIsLoggedIn(userIsLoggedIn);
};
function LoginSignup() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  //initialise variable with signup
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
      const response = await fetch("/organizations");
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

  useEffect(() => {
    const fetchAndSetOrganizations = async () => {
      const organizations = await fetchOrganizations();
      setOrganizationOptions(organizations);
    };

    fetchAndSetOrganizations();
  }, []);
  
  
  const Signup = async () => {
    try {
      const response = await fetch("/signup", {
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
        // Signup successful, handle accordingly
        console.log("Signup successful:", data);
        setTimeout(() => {
          // navigate("/login"); // Replace with your login route
        }, 2000);
      } else {
        // Signup failed, handle error message
        console.error("Signup error:", data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const Login = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Signup successful, handle accordingly
        console.log("login successful:", data);
        setIsLoggedIn(true); 
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/contacts"); // Replace with your login route
        }, 2000);
      } else {
        // Signup failed, handle error message
        console.error("Login error:", data.error);
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
            <img src={user_icon} alt="" />
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
    <label htmlFor="organization"> Organization: </label>
    <select style={{width:'50%', height:'50%', backgroundColor:'lightgrey', borderRadius:'4px',margin:'12px'}}
      id="organization"
      onChange={(e) => setSelectedOrganization(e.target.value)}
      value={selectedOrganization}
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
              <img src={user_icon} alt="" />
              <input
                type="number"
                placeholder="Phone Number"
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
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
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
      <div className="message">{message}</div>
    </div>
  );
}

export  default LoginSignup;