let favsIDArr = [];
let favsObjArr = [];


function isFavourite(foodObj) {
    return favsIDArr.includes(foodObj.id);
}


function addFavourite(foodObj) {
    favsIDArr = favsIDArr.filter(item => item !== foodObj.id);
    favsObjArr = favsObjArr.filter(obj => obj.id !== foodObj.id);

    favsIDArr.unshift(foodObj.id);
    favsObjArr.unshift(foodObj);

    console.log("Added favourite:", foodObj.id);
}


function removeFavourite(foodObj) {
    favsIDArr = favsIDArr.filter(item => item !== foodObj.id);
    favsObjArr = favsObjArr.filter(obj => obj.id !== foodObj.id);

    console.log("Removed favourite:", foodObj.id);
}


function readFavourites() {
    return favsObjArr;
}


export {isFavourite, addFavourite, removeFavourite, readFavourites};

