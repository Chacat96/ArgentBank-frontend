import "../style/css/Profile.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../services/service";
import { updateUser } from "../redux/userSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);

    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState("");

    //Fonction de chargement du profil
    useEffect(() => {
        async function fetchProfile() {
            try {
                const profileData = await getUserProfile(token);

                dispatch(updateUser(profileData));
            } catch (error) {
                console.error("Erreur de chargement du profil :", error);
            }
        }
        if (token) {
            fetchProfile();
        } else {
            navigate("/");
        }
    }, [token, dispatch, navigate]);

    //Fonction de mise à jour du profil
    useEffect(() => {
        if (user) {
          setFirstName(user.firstName);
          setLastName(user.lastName);
        }
      }, [user]);
      
    //Fonction pour sauvegader le nom
    const handleSave = async () => {
        try {
          setError("");
          const updatedUser = await updateUserProfile(firstName, lastName, token);
          if (updatedUser) {
            dispatch(updateUser(updatedUser));
            setIsEditing(false);
          } else {
            throw new Error("Erreur de mise à jour du profil");
          }
        } catch (err) {
          console.error("Erreur de mise à jour du profil :", err);
          setError( "Erreur de mise à jour du profil");
        }
      };

    //Fonction d'édition du nom
    const handleEditClick = () => {
        setIsEditing(true);
        setFirstName(user.firstName);
        setLastName(user.lastName);
      };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <main className="main bg-dark">
            <div className="header">
            {isEditing ? (
            <>
                <h1>Welcome back</h1>
                {error && <p className="error">{error}</p>}
                <div className="edit-form-wrapper">
                <div className="edit-form">
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="edit-form__input"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="edit-form__input"
                />
                </div>
                <div className="edit-buttons">
                    <button className="edit-buttons__btn" onClick={handleSave}>Save</button>
                    <button className="edit-buttons__btn" onClick={handleCancel}>
                    Cancel
                    </button>
                </div>
                </div>
            </>
            ) : (
            <>
                <h1>
                Welcome back
                <br />
                {error && <p className="error">{error}</p>}
                {user?.firstName} {user?.lastName}!
                </h1>
                <button className="edit-button" onClick={handleEditClick}>
                Edit Name
                </button>
            </>
            )}
        </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    )
}

export default Profile;