(() => {

    async function showCaracter() {
        fetch('https://character-database.becode.xyz/characters')
            .then((data)=>data.json())
            .then((res)=>{console.table(res)})
    }

    document.querySelector(".run").addEventListener("click", () => {

        showCaracter();

    })

})();

