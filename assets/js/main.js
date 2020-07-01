let modal = document.querySelector(".content-show");
let deletBtns = document.querySelectorAll("#delete");
let nameEdit = document.querySelector("#name-edit");
let descEdit = document.querySelector("#desc-edit");
let shortDescEdit = document.querySelector("#shortDescription-edit");
let closeBtnEdit = document.querySelector("#close-btn-edit");
let modalEdit = document.querySelector(".content-edit");
let modalDelete = document.querySelector(".modalDelete");
let btnConfirmDelete = document.querySelector("#btnConfirmDelete");
let btnCloseDelModal = document.querySelector(".closeDeleteModal");
let formEdit = document.getElementById("form-edit");
let contentEdit = document.querySelector(".content-edit");
let fileImgEdit = document.getElementById("image-edit");

let fetchData = async () =>await (await fetch("https://character-database.becode.xyz/characters")).json();
let fetchDataById = async (id) => await (await fetch("https://character-database.becode.xyz/characters/" + id)  ).json();
   
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
      closeModal(document.getElementById("back"), modal, "open");
    });
  });
}

function deleteElement() {
  let btnDeletes = document.querySelectorAll("#delete");
  btnDeletes.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      modalDelete.classList.add("open");
      btnConfirmDelete.addEventListener("click", async () => {
        modalDelete.classList.remove("open");
        await fetch("https://character-database.becode.xyz/characters/" + e.target.parentElement.parentElement.id,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        ).then(() => {
          getCharacters();
        });
      });
    });
  });
  closeModal(btnCloseDelModal, modalDelete, "open");
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
  let imgUrl;
  fileImgEdit.addEventListener("change", async () => {
    let file64 = document.querySelector("input[type=file]").files[0];
    await toBase64(file64).then((value) => {
      imgUrl = value.substring(value.indexOf(",") + 1);
    });
  });

  formEdit.addEventListener("submit", async (e) => {
    e.preventDefault();
    contentEdit.classList.remove("open");
    let currentChar = await fetchDataById(idCahr);
    console.log(currentChar);
    await fetch("https://character-database.becode.xyz/characters/" + idCahr, {
      method: "PUT",
      body: JSON.stringify({
        image: imgUrl === undefined ? currentChar.image : imgUrl,
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

  closeModal(closeBtnEdit, modalEdit, "open");
}

const closeModal = (btn, modal, className) =>
  btn.addEventListener("click", () => modal.classList.remove(className));
getCharacters();

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
