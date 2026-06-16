document.getElementById("connectBtn").addEventListener("click", async () => {
  const host = document.getElementById("host").value.trim();
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!host || !user || !pass) {
    alert("Completa todos los campos.");
    return;
  }

  const url =
    `${host}/player_api.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (data.user_info) {
      alert("✅ Conexión correcta");
    } else {
      alert("⚠️ La respuesta no contiene información de usuario.");
    }
  } catch (err) {
    console.error(err);
    alert(
      "❌ No se pudo conectar. Es posible que el servidor bloquee peticiones desde el navegador (CORS) o que los datos sean incorrectos."
    );
  }
});
