import React, { useState } from "react";
import "../style/css/Login.css";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { loginUser } from "../services/service";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    

    const dispatch = useDispatch();
    const navigate = useNavigate();
     
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");
    
        try {
          const data = await loginUser(email, password)
          sessionStorage.setItem("token", data.token)

          const token = data?.token;
          
          if (!token) {
            setError("Invalid credentials");
            return;
          }

          if (rememberMe) {
            localStorage.setItem("token", token);
          }

          dispatch(
            loginSuccess({
              user: data,
              token: data.token
            })
          )
          navigate("/profile")
    
        } catch (err) {
          console.error("Erreur de connexion :", err);
          setError("Email ou mot de passe incorrect");
        }
      }

    return (
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>

                    {error && (  
                        <div className="error-message" style={{
                            color: 'red', 
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                        type="text"
                        id="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        />
                    </div>
                    <div className="input-remember">
                        <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
    )
}

export default Login;