let name = document.querySelector("#nameRecup");
let desc = document.querySelector("#desc");
let shortDescriptionRecup = document.querySelector("#shortDescriptionRecup");
let form = document.getElementById("form");
let file = document.querySelector("#imageRecup");
let url;
file.addEventListener("change", async () => {
  let file64 = document.querySelector("input[type=file]").files[0];
  await toBase64(file64).then((value) => {
    console.log(value);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch("https://character-database.becode.xyz/characters", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: value.substring(value.indexOf(",") + 1),
          name: name.value,
          description: desc.value,
          shortDescription: shortDescriptionRecup.value,
        }),
      });
    });
  });
});

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


  document.getElementById("submit").addEventListener("click", () => {
    alert("Information a bien été enregisté dans l'api. Appuiez sur return pour revenir a la page d'accueil");
  })