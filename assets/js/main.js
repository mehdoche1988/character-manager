let boxs = document.getElementById("");
let modal = document.querySelector(".content-show");
let deletBtns = document.querySelectorAll("#delete");
let nameEdit = document.querySelector("#name-edit");
let descEdit = document.querySelector("#desc-edit");
let shortDescEdit = document.querySelector("#shortDescription-edit");

let fetchData = async () =>
  await (
    await fetch("https://character-database.becode.xyz/characters")
  ).json();
let fetchDataById = async (id) =>
  await (
    await fetch("https://character-database.becode.xyz/characters/" + id)
  ).json();

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
              <button class="button" id="edit">Edit</></button>
              <button class="button" id="delete">Delete</button>
            </div>
          </div>`;
    });
    document.querySelector(".content").innerHTML = outPut;
    getInfoCharcters();
    deleteElement();
    editCharcters();
  });
}

function getInfoCharcters() {
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
          <img src="data:image/JPEG;base64,${character.image}" id="imageSherch"/>
        </div>
        <div class="name">${character.name}</div>
        <div class="description">
          ${character.description}
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

function deleteElement() {
  let btnDeletes = document.querySelectorAll("#delete");
  btnDeletes.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      document.querySelector(".modalDelete").classList.add("open");
      document
        .querySelector("#btnDelModal")
        .addEventListener("click", async () => {
          document.querySelector(".modalDelete").classList.remove("open");
          await fetch(
            "https://character-database.becode.xyz/characters/" +
              e.target.parentElement.parentElement.id,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          );
          getCharacters();
        });
    });
  });
  document.querySelector(".closeDeleteModal").addEventListener("click", () => {
    document.querySelector(".modalDelete").classList.remove("open");
  });
}

function editCharcters() {
  let idChar;
  let resutEdit = document.querySelectorAll("#edit");
  resutEdit.forEach((ele) => {
    ele.addEventListener("click", async (e) => {
      document.querySelector(".content-edit").classList.add("open");
      idChar = e.target.parentElement.parentElement.id;
      let charachter = await fetchDataById(idChar);
      nameEdit.value = charachter.name;
      descEdit.value = charachter.description;
      shortDescEdit.value = charachter.shortDescription;
      editCharctersById(idChar);
    });
  });
}

async function editCharctersById(idCahr) {
  let imgurl;
  document.getElementById("form-edit").addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".content-edit").classList.remove("open");
    await fetchDataById(idCahr).then((data) => {
      imgurl = data.image;
    });
    await fetch("https://character-database.becode.xyz/characters/" + idCahr, {
      method: "PUT",
      image: imgurl,
      body: JSON.stringify({
        name: nameEdit.value,
        description: descEdit.value,
        shortDescription: shortDescEdit.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      getCharacters();
    });
  });
}
document.querySelector("#close-btn-edit").addEventListener("click", () => {
  document.querySelector(".content-edit").classList.remove("open");
});
getCharacters();
