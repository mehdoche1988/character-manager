document.getElementById("submit").addEventListener("click", async () => {


    let name = document.querySelector('#nameRecup');
    let desc = document.querySelector('#desc');
    let shortDescriptionRecup = document.querySelector('#shortDescriptionRecup');
    let imageRecup = document.querySelector('#imageRecup');
    let Carts = {
        name: name.value,
        description: desc.value,
        shortDescription: shortDescriptionRecup.value,
        image: imageRecup.value
    }

    await fetch("https://character-database.becode.xyz/characters", {
        method: "POST",
        body: JSON.stringify(Carts),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    });

    console.log("fonctionne")
});


