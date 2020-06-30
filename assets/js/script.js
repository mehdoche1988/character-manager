let name = document.querySelector('#nameRecup');
let desc = document.querySelector('#desc');
let shortDescriptionRecup = document.querySelector('#shortDescriptionRecup');
let images = document.querySelector('#imageRecup');


document.getElementById("form").addEventListener("submit", (e) => {

    e.preventDefault()
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

<<<<<<< HEAD



=======
});
>>>>>>> 1eef570d31663f4c36b13ed04543f15a678496ab
