//------------ URL'S ---------------//

let baseURL = "https://boat-mock-server.onrender.com" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;


let headphoneList ;
let airpodsList ;
let bluetoothSpeakerList ;
let smartWatcheList ;

let loggedInUser  = JSON.parse(localStorage.getItem("user")) || null ;
let loggedInUserCart = JSON.parse(localStorage.getItem("user")) || null ;
let cartCount = document.querySelector("#cart-count");
if(loggedInUser){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.products.length;
}

//------------ essentials fetching  ---------------//
async function fetchProductsHeadphones() {
    try{
        let res = await fetch(`${headphonesURL}`);
        let data = await res.json();
        console.log("Headphones",data);
        headphoneList = data;
        headphoneListDiv.innerHTML = "";
        appendProductsToDOM( headphoneList, headphoneListDiv );
        // localStorage.setItem("headphones", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}
async function fetchProductsAirpods() {
    try{
        let res = await fetch(`${airpodsURL}`);
        let data = await res.json();
        console.log("Airpods",data);
        airpodsList = data;
        // localStorage.setItem("airpods", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}
async function fetchProductsBlutoothSpeakers() {
    try{
        let res = await fetch(`${bluetoothSpeakersURL}`);
        let data = await res.json();
        console.log("BlutoothSpeakers",data);
        bluetoothSpeakerList = data;
        // localStorage.setItem("bluetoothSpeaker", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}
async function fetchProductsSmartWatches() {
    try{
        let res = await fetch(`${smartWatchURL}`);
        let data = await res.json();
        console.log("SmartWatches",data);
        smartWatcheList = data;
        console.log(smartWatcheList);
        smartWatchListDiv.innerHTML = "";
        appendProductsToDOM( smartWatcheList, smartWatchListDiv );
        // localStorage.setItem("neckband", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}
fetchProductsHeadphones();
fetchProductsAirpods();
fetchProductsBlutoothSpeakers();
fetchProductsSmartWatches();

//----------- for showing logged in user  -----------//
//----------- for redirecting to profile and admin  -----------//
let signinBtn = document.querySelector(".navbar-signin-btn") ;
if(loggedInUser){
    signinBtn.innerText = `Hi ${loggedInUser.firstName}`
}
signinBtn.addEventListener("click", ()=>{
    if(signinBtn.innerText === "SIGNIN/SIGNUP"){
        window.location.href = "login.html";
    }else if (signinBtn.innerText === "Admin"){
        window.location.href = "admin.html";
    }
})

//------------- for cart modal  -----------------//
let cartIcon = document.querySelector("#navbar-cart-icon") ;
cartIcon.addEventListener( "click", ()=>{
    window.location.href = "cart.html";
}) 


//------------- for banner crausal -----------------//
const bannerImgArray =["../img/banner-img.png","../img/banner-img.png","../img/banner-image-3.webp","../img/banner-image-5.webp","../img/banner-image-7.webp","../img/products/earbuds-prod-3.webp","../img/products/speaker-prod-1.webp","../img/products/headphone-prod-3.webp","../img/products/watch-prod-2.webp","../img/products/earbuds-prod-4.webp","../img/products/earbuds-prod-2.png"] ;
let bannerImg = document.querySelector(".banner-img") ;
let crausalIndex = 0;
let id = setInterval(() => {
    if(crausalIndex == bannerImgArray.length-1){
        crausalIndex = 0 ;
    }
    crausalIndex++
    bannerImg.src = bannerImgArray[crausalIndex] ;
}, 1500);


//------------- for category click redirecting -----------------//
let headphonesCategory = document.querySelector("#headphones-category") ;
let speakersCategory = document.querySelector("#speakers-category") ;
let smartWatchesCategory = document.querySelector("#smartWatch-category") ;
let airpodsCategory = document.querySelector("#airpods-category") ;
headphonesCategory.addEventListener("click", ()=>{
    window.location.href = "headphones.html";
})
speakersCategory.addEventListener("click", ()=>{
    window.location.href = "blutooth_speakers.html";
})
smartWatchesCategory.addEventListener("click", ()=>{
    window.location.href = "smart_watch.html";
})
airpodsCategory.addEventListener("click", ()=>{
    window.location.href = "airpods.html";
})


let headphoneListDiv = document.querySelector(".headphone-list") ;
let smartWatchListDiv = document.querySelector(".smartWatch-list") ;
// let smartWatchesListDiv = document.querySelector(".smart-watches-list") ;
// let earbudsCategory = document.querySelector("#earbuds-category") ;

function appendProductsToDOM(productList, appendingDiv) {
    console.log(productList);
    productList?.forEach( (item,index) => {
        let card = createProdudctCard(item,index);
        card.addEventListener("click", ()=>{
            localStorage.setItem("clickedProduct",JSON.stringify(item));
            window.location.href = "singleProduct.html";
        })
        appendingDiv.append(card);
    });
}



function createProdudctCard(item,index){
    let card = document.createElement("div");
    card.className = "product-card";

    let thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";
    let cardImg = document.createElement("img");
    cardImg.src = `${item.image}`;
    cardImg.alt = "Product Image";

    let productDetails = document.createElement("div");
    productDetails.className = "product-details";
    let name = document.createElement("div");
    name.className = "name";
    name.innerText = `${item.productName}`;

    let price = document.createElement("div");
    price.className = "price";
    price.innerText = `${item.price}`;

    thumbnail.append(cardImg);
    productDetails.append(name,price);

    card.append(thumbnail,productDetails);
    return card ;
}

//--- logout button ---//
if(loggedInUser){
    let navbarButtonsDiv = document.querySelector(".left")
    let logoutBtn = document.createElement("li");
    logoutBtn.innerText = "LOGOUT"

    navbarButtonsDiv.append(logoutBtn);

    logoutBtn.addEventListener("click", ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    })
}