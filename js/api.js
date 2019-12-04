var base_url = "https://www.football-data.org/";

var options={
  mode: 'no-cors',
  headers:{
    'X-Auth-Token' : 'b86150bba55f4b60b499005184cdab02'
  }
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getArticles() {
  fetch(base_url + "v2/competitions/", options)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.competitions.forEach(function(data) {
        articlesHTML += `
              <div class="card">
                <div class="card-content">
                  <span class="card-title truncate">${data.name}</span>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("kompetisi").innerHTML = articlesHTML;
    })
    .catch(error);
}