document.getElementById("connectBtn").addEventListener("click", async () => {

  const host = document.getElementById("host").value.trim();
  const username = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value.trim();

  if (!host || !username || !password) {
    alert("Completa todos los campos.");
    return;
  }

  try {

    // Login
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

    if (data.user_info && data.user_info.auth === 1) {

      // Ocultar formulario
      document.querySelector(".login-card").style.display = "none";

      // Obtener categorías
      const categorias = await fetch("http://localhost:3000/api/live-categories", {
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

      const lista = await categorias.json();

      // Crear pantalla principal
      const app = document.createElement("div");

      app.style.padding = "30px";
      app.style.color = "white";

      app.innerHTML = `
        <h1>📺 Categorías IPTV</h1>
        <div id="listaCategorias"></div>
      `;

      document.body.appendChild(app);

      const contenedor = document.getElementById("listaCategorias");

      lista.forEach(cat => {

        const item = document.createElement("div");

        item.style.background = "#24324b";
        item.style.padding = "15px";
        item.style.margin = "10px 0";
        item.style.borderRadius = "10px";
        item.style.cursor = "pointer";

        item.textContent = cat.category_name;

        contenedor.appendChild(item);

      });

    } else {

      alert("❌ Usuario o contraseña incorrectos.");

    }

  } catch (err) {

    console.error(err);

    alert("❌ Error al conectar.");

  }

});
