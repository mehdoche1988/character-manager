(() => {
    let name = document.querySelector('#nameRecup');
    let desc = document.querySelector('#desc');
    let shortDescriptionRecup = document.querySelector('#shortDescriptionRecup');
    let imageRecup = document.querySelector('#imageRecup');

    function createCharcters() {

        // let name = ;
        // let desc = ;
        // let shortDescriptionRecup =;
        // let imageRecup =;

        let Carts = {
            name: name.value,
            description: desc.value,
            shortDescription: shortDescriptionRecup.value,
            image: imageRecup.value
        }
        console.log(Carts);
    }

    createCharcters();

})();


