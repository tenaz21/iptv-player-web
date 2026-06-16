document.getElementById("connectBtn").addEventListener("click", async () => {
  const host = document.getElementById("host").value.trim();
  const username = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value.trim();

  if (!host || !username || !password) {
    alert("Completa todos los campos.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        host,
        username,
        password
      })
    });

    const data = await response.json();

    console.log(data);

    if (data.user_info && data.user_info.auth === 1) {
      alert("✅ Inicio de sesión correcto");
      // Aquí luego podremos cargar TV, películas y series
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }

  } catch (error) {
    console.error(error);
    alert("❌ No se pudo conectar con el backend.");
  }
});
