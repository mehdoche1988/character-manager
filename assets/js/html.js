function getAllCharachterHtml(id,img,name,shDesc){
    return `
    <div class="box" id=${id}>
    <div class="image-contener">
      <img src=data:image/JPEG;base64,${img} alt="test image" />
    </div>
    <div class="name">
      <h3>${name}</h3>
    </div>
    <div class="shortDescription">
       ${shDesc}
    </div>
    <div class="btns">
      <button class="button" id="show"><i class="far fa-eye"></i> Show</button>
      <button class="button" id="edit"><i class="far fa-edit"></i> Edit</></button>
      <button class="button" id="delete"><i class="fas fa-trash-alt"></i> Delete</button>
    </div>
  </div>`;
}
function getSingleCharInfo(img , name , desc){
    return `
    <div class="box-show">
    <button class="button close" id="back"><i class="fa fa-times" aria-hidden="true"></i></button>
    <div class="image-contener">
      <img src="data:image/JPEG;base64,${img}" id="imageSherch"/>
    </div>
    <div class="name">${name}</div>
    <div class="description" markdown="1">
      ${desc}
    </div>
  </div>  `;
}
export {getAllCharachterHtml ,getSingleCharInfo}