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
    return await res.json();
  }
  