let boxs = document.getElementById("");
let modal = document.querySelector(".content-show");
let deletBtns = document.querySelectorAll("#delete");

let nameEdit = document.querySelector("#name-edit");
let descEdit = document.querySelector("#desc-edit");
let shortDescEdit = document.querySelector("#shortDescription-edit");


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
              <button class="button" id="edit">Edit</></button>
              <button class="button" id="delete">Delete</button>
            </div>
          </div>`;
    });
    document.querySelector(".content").innerHTML = outPut;
    deleteElement()
 
    
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
getInfoCharcters();

async function deleteElement() {
  let btnDeletes = document.querySelectorAll("#delete");
  btnDeletes.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      document.querySelector(".modalDelete").classList.add("open");
      document
        .querySelector("#btnDelModal")
        .addEventListener("click", async () => {
          document.querySelector(".modalDelete").classList.remove("open");
          await fetch("https://character-database.becode.xyz/characters/" + e.target.parentElement.parentElement.id,
            {
              method: "DELETE",
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




async function editCharcters() {
  await getCharacters();
  await getInfoCharcters();
  let idChar ;
  let resutEdit = document.querySelectorAll('#edit');
  resutEdit.forEach(ele => {
    ele.addEventListener('click', async(e) => {
     idChar =e.target.parentElement.parentElement.id;
     let charachter = await fetchDataById(idChar)
     nameEdit.value = charachter.name;
     descEdit.value = charachter.description;
     shortDescEdit.value = charachter.shortDescription;
     updateCharById(idChar)
     console.log(idChar)
     
    })
  
  
  })
}




editCharcters();





// PUT to the resource with id = 5 to change the name of task
/*fetch("https://jsonplaceholder.typicode.com/todos/5",
method: "PUT",
body: JSON.stringify({
userId: 1,
id: 5,
title: "test",
completed: false
})


)*/

async function updateCharById(idCahr){
  let imgurl;
  document.getElementById("form-edit").addEventListener("submit" , async (e)=>{
    e.preventDefault()

   await fetchDataById(idCahr).then((data)=>{
       imgurl = data.image
    })


    await fetch("https://character-database.becode.xyz/characters/"+idCahr , {
      method: "PUT",
      image : imgurl,
      body: JSON.stringify({
      name: nameEdit.value,
      description: descEdit.value,
      shortDescription: shortDescEdit.value
    
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8"    
      }
  })
 })
 
}