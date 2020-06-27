(() => {
//Fonction show les carateres
    async function showCaracters() {
        fetch('characters')
            .then((data) => data.json())
            .then((res) => { console.table(res) })
    }
// au clique fonction delete
    document.querySelector("#delete").addEventListener("click", () => {
        charactersId = document.querySelector("#ID").value;
        deleteCharacters(charactersId);
    });
// au clique fonction show
    document.querySelector("#run").addEventListener("click", () => {

        showCaracters();

    })

// -fonction delete
    const deleteCharacters = id => {
        const charactersObject = JSON.stringify({
            id: id
        });

        let url = "characters" + charactersId;
        fetch(url, {
            method: "DELETE",
            headers: new Headers({
                "content-type": "application/json"
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
        console.log(charactersId);
    };

})();


