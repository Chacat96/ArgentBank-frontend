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

    const dispatch = useDispatch();
    const navigate = useNavigate();
     
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const data = await loginUser(email, password);
        const token = data.body.token;

        dispatch(loginSuccess({ user: null, token }));

        navigate("/profile");
      } catch (error) {
        console.error("Erreur de connexion :", error);
      }

    //   const fakeUser = {
    //     firstName: "John",
    //     lastName: "Doe",
    //     email : "T4oqo@example.com"
    //   }
      
    //   const fakeToken = "abc123token";

    //   dispatch(loginSuccess({ user: fakeUser, token: fakeToken }));

    //   console.log("connexion réussi")
    //   navigate("/profile");
    };

    return (
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
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