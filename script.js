document.getElementById("dataHora").value = new Date().toLocaleString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const form = document.getElementById("presencaForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let valid = true;

  const nrSelected = document.querySelector(
    'input[name="treinamento"]:checked',
  );
  toggle("errNr", !nrSelected);
  if (!nrSelected) valid = false;

  const nome = document.getElementById("nome");
  toggle("errNome", !nome.value.trim());
  if (!nome.value.trim()) valid = false;

  const matricula = document.getElementById("matricula");
  toggle("errMatricula", !matricula.value.trim());
  if (!matricula.value.trim()) valid = false;

  const funcao = document.getElementById("funcao");
  toggle("errFuncao", !funcao.value.trim());
  if (!funcao.value.trim()) valid = false;

  const empresa = document.getElementById("empresa");
  toggle("errEmpresa", !empresa.value.trim());
  if (!empresa.value.trim()) valid = false;

  if (!valid) return;

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Enviando...";

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      form.classList.add("hide");
      document.getElementById("footerNote").classList.add("hide");
      document.getElementById("success").classList.add("show");
    } else {
      btn.disabled = false;
      btn.textContent = "Confirmar Presença";
      alert("Erro ao enviar. Tente novamente.");
    }
  } catch {
    btn.disabled = false;
    btn.textContent = "Confirmar Presença";
    alert("Sem conexão. Verifique sua internet e tente novamente.");
  }
});

function toggle(id, show) {
  document.getElementById(id).classList.toggle("show", show);
}
