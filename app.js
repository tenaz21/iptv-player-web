const btn = document.getElementById("connectBtn");

btn.onclick = () => {

    const host = document.getElementById("host").value;
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if(!host || !user || !pass){

        document.getElementById("status").innerHTML =
        "⚠️ Completa todos los campos.";

        return;
    }

    document.getElementById("status").innerHTML =
    "✅ Datos introducidos correctamente.";
};
