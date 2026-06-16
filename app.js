document.getElementById("connectBtn").addEventListener("click", async () => {

  const host = document.getElementById("host").value.trim();
  const username = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value.trim();

  try {

    const login = await fetch("http://localhost:3000/api/login", {
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

    const data = await login.json();

    if (!data.user_info || data.user_info.auth !== 1) {
      alert("Login incorrecto");
      return;
    }

    document.querySelector(".login-card").style.display = "none";

    const categorias = await fetch(
      "http://localhost:3000/api/live-categories",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          host,
          username,
          password
        })
      }
    );

    const lista = await categorias.json();

    document.body.innerHTML = `
      <div style="display:flex;height:100vh;color:white;">
        
        <div id="categorias"
             style="width:300px;background:#16233b;padding:20px;overflow:auto;">
          <h2>📂 Categorías</h2>
        </div>

        <div id="canales"
             style="flex:1;padding:20px;overflow:auto;">
          <h2>📺 Canales</h2>
        </div>

      </div>
    `;

    const panelCategorias =
      document.getElementById("categorias");

    const panelCanales =
      document.getElementById("canales");

    lista.forEach(cat => {

      const btn = document.createElement("div");

      btn.textContent = cat.category_name;

      btn.style.padding = "12px";
      btn.style.margin = "10px 0";
      btn.style.background = "#24324b";
      btn.style.borderRadius = "10px";
      btn.style.cursor = "pointer";

      btn.onclick = async () => {

        panelCanales.innerHTML =
          "<h2>📺 Cargando canales...</h2>";

        const response = await fetch(
          "http://localhost:3000/api/live-streams",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              host,
              username,
              password,
              category_id: cat.category_id
            })
          }
        );

        const canales = await response.json();

        panelCanales.innerHTML =
          `<h2>${cat.category_name}</h2>`;

       canales.forEach(canal => {

  const item = document.createElement("div");

  item.textContent = canal.name;

  item.style.padding = "10px";
  item.style.marginBottom = "8px";
  item.style.background = "#24324b";
  item.style.borderRadius = "8px";
  item.style.cursor = "pointer";

  item.onclick = async () => {

    try {

      const respuesta = await fetch(
        "http://localhost:3000/api/live-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            host,
            username,
            password,
            stream_id: canal.stream_id
          })
        }
      );

      const datos = await respuesta.json();

      // Abre el stream en una pestaña nueva
      window.open(datos.url, "_blank");

    } catch (error) {

      console.error(error);
      alert("No se pudo abrir el canal.");

    }

  };

  panelCanales.appendChild(item);

});

      };

      panelCategorias.appendChild(btn);

    });

  } catch (err) {

    console.error(err);

    alert("Error de conexión");

  }

});
