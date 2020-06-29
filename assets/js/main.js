let boxs = document.getElementById("");
let modal = document.querySelector(".content-show");
let deletBtns = document.querySelectorAll("#delete");



let fetchData = async () => await (await fetch("https://character-database.becode.xyz/characters")).json();
let fetchDataById = async (id) => await (await fetch("https://character-database.becode.xyz/characters/" + id)).json();

async function getCharacters() {
  let outPut = "";
  await fetchData().then((data) => {
    data.forEach((ele) => {
      outPut += `
            <div class="box" id=${ele.id}>
            <div class="image-contener">
              <img src=data:image/JPEG;base64,${ele.image} alt="test image" />
            </div>
            <div class="name">
              <h6>${ele.name}</h6>
            </div>
            <div class="shortDescription">
               ${ele.shortDescription}
            </div>
            <div class="btns">
              <button class="button" id="show">Show</button>
              <button class="button" id="edit">Edit</button>
              <button class="button" id="delete">Delete</button>
            </div>
          </div>`;
    });
    document.querySelector(".content").innerHTML = outPut;
  });



}

getCharacters();

async function getInfoCharcters() {
  await getCharacters();
  let boxs = document.querySelectorAll("#show");
  boxs.forEach((box) => {
    box.addEventListener("click", async (e) => {
      let id = e.target.parentElement.parentElement.id;
      let character = await fetchDataById(id);

      let outPut = "";
      outPut += `
        <div class="box-show">
        <button class="button close" id="back"><i class="fa fa-times" aria-hidden="true"></i></button>
        <div class="image-contener">
          <img src="data:image/JPEG;base64,${character.image}" />
        </div>

        <div class="name">${character.name}</div>
        <div class="description">
          ${character.description}
        </div>
        <div>
          <button class="button" id="Edit">edit</button>
          <button class="button" id="Delete">delete</button>
        </div>
      </div>  `;
      modal.innerHTML = outPut;
      modal.classList.add("open");
      document.getElementById("back").addEventListener("click", () => {
        modal.classList.remove("open");
      });
    });
  });


}
getInfoCharcters();


