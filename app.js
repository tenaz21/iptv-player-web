document.getElementById("connectBtn").addEventListener("click", () => {
  const host = document.getElementById("host").value.trim();
  const user = document.getElementById("user").value.trim();

  document.getElementById("status").textContent =
    `Datos introducidos para ${host} (usuario: ${user}).`;
});
