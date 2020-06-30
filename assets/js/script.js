let name = document.querySelector('#nameRecup');
let desc = document.querySelector('#desc');
let shortDescriptionRecup = document.querySelector('#shortDescriptionRecup');


document.getElementById("form").addEventListener("submit", (e) => {

    e.preventDefault()
<<<<<<< HEAD
 console.log("test")
  
 fetch(
    "https://character-database.becode.xyz/characters",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: "R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
        name: name.value,
        description: desc.value,
        shortDescription: shortDescriptionRecup.value,
      }),
    }
  );

});


 document.getElementById("form-edit").addEventListener("submit" , (e)=>{



   console.log("form submi for edit")
 })





=======
    console.log("test")

    fetch(
        "https://character-database.becode.xyz/characters",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                images: images.value,
                name: name.value,
                description: desc.value,
                shortDescription: shortDescriptionRecup.value,
            }),
        }
    );
});
>>>>>>> 20127127703125177400215c242c167c78cc1836
