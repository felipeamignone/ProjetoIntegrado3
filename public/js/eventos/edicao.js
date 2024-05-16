document.addEventListener("DOMContentLoaded", function () {
  const evenId = window.location.href.split("/").pop();

  fetch(`/eventos/${evenId}`, {
    method: "get",
  })
    .then((r) => r.json())
    .then((r) => {
      let { nome, data, statusId, usuarioId } = r.data;
      const formatedData = new Date(data).toISOString().split("T")[0];
      $("#eventoNome").val(nome);
      $("#eventoData").val(formatedData);
      $("#eventoStatusId").val(statusId);
      $("#eventoUsuarioId").val(usuarioId);
    });

  $("#evento-form").on("submit", function (e) {
    e.preventDefault();
    const nome = $("#eventoNome").val();
    const data = $("#eventoData").val();
    const statusId = $("#eventoStatusId").val();
    const usuarioId = $("#eventoUsuarioId").val();

    const body = {
      nome,
      data,
      statusId,
      usuarioId,
    };

    if (validaFormulario(nome, data, statusId, usuarioId)) {
      fetch(`/eventos/${evenId}`, {
        method: "put",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) =>
        r.json().then((r) => {
          alert(r.message);
          if (r.ok) {
            window.location.href = "/eventos";
          }
        })
      );
    }
  });
});

const validaFormulario = (nome, data, statusId, usuarioId) => {
  return nome && data && statusId && usuarioId;
};