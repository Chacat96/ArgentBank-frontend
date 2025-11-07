// export async function updateUserProfile(firstName, lastName, token) {
//     const res = await fetch("http://localhost:3001/api/v1/user/profile", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ firstName, lastName }),
//     });
  
//     if (!res.ok) throw new Error("Erreur API update profile");
//     return await res.json();
//   }
// Connexion 
export async function loginUser(email, password) {
    console.log("🔵 [loginUser] email :", email);
    console.log("🔵 [loginUser] password :", password);
    const res = await fetch("/api/v1/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("🟠 [loginUser] Response OK ?", res.ok);
    if (!res.ok) throw new Error("Erreur API login");
    const data = await res.json();
    console.log("🟢 [loginUser] Data reçue :", data);
    return data;
  }
  
  // Profil 
  export async function getUserProfile(token) {
    console.log("🔵 [getUserProfile] Token reçu :", token);
    const res = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("🟠 [getUserProfile] Response OK ?", res.ok);
    if (!res.ok) throw new Error("Erreur API get profile");
    const data = await res.json();
    console.log("🟢 [getUserProfile] Data reçue :", data);
    return data.body;
  }
  
  // Mettre à jour le profil 
  export async function updateUserProfile(firstName, lastName, token) {
    const res = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName }),
    });
  
    if (!res.ok) throw new Error("Erreur API update profile");
    const data = await res.json();

    return data;
  }
  
  // Inscription 
  export async function signupUser(email, password, firstName, lastName) {
    const res = await fetch("http://localhost:3001/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
  
    if (!res.ok) throw new Error("Erreur API signup");
    const data = await res.json();

    return data;
  }
  
  