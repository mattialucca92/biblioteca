$(document).ready(function () {
  $("#btn-categoria").click(function () {
    let categoria = $("#categoria").val().trim();
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
          // console.log(libro)
          let titolo = libro.title;
          let autore = libro.authors
            ? libro.authors.map((n) => n.name).join("  -  ")
            : "Autore non disponibile";
          $("#risultati").append(`
            <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${titolo}</h5>
              <p class="card-text">${autore}</p>
              <a href="#" class="btn btn-primary">Clicca per vedere dettaglio</a>
            </div>
          </div>
          `);
        });
        console.log("data", data);
      },
      error: function (error) {
        console.error("Errore durante la richiesta:", error);
      },
    });
  });
});
