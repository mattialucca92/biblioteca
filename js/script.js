$(document).ready(function () {
  $("#btn-categoria").click(function () {
    let categoria = $("#categoria").val().trim().toLowerCase();
    if (categoria === "") {
      alert("Compila il campo categoria");
      return;
    }
    let pathJson = `https://openlibrary.org/subjects/${categoria}.json`;

    $.ajax({
      url: pathJson,
      method: "GET",
      dataType: "json",
      success: function (data) {
        $("#risultati").empty();

        data.works.forEach((libro) => {
          let titolo = libro.title;
          let autore = libro.authors
            ? libro.authors.map((n) => n.name).join(" - ")
            : "Autore non disponibile";
          let key = libro.key;

          $("#risultati").append(`
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${titolo}</h5>
        <p class="card-text">${autore}</p>
        <button class="btn btn-primary btn-dettaglio" data-key="${key}" data-titolo="${titolo}" data-bs-toggle="modal" data-bs-target="#desc-modal">
          Clicca per vedere dettaglio
        </button>
      </div>
    </div>
  `);
        });
      },
      error: function (error) {
        console.error("Errore durante la richiesta:", error);
      },
    });
  });

  $(document).on("click", ".btn-dettaglio", function () {
    let key = $(this).data("key");
    let titoloModale = $(this).data("titolo");
    $("#title-modal").text(titoloModale);
    let path = `https://openlibrary.org${key}.json`;
    $.ajax({
      url: path,
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        let description = data.description.value;
        $("#modale-description").text(description);
      },
      error: function (error) {
        console.error("Errore durante la richiesta:", error);
      },
    });
  });
});
