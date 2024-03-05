//------------ URL'S ---------------//

let baseURL = "https://boat-mock-server.onrender.com" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;


let bluetoothSpeakerList ;

let loggedInUser  = JSON.parse(localStorage.getItem("user")) || null ;
let loggedInUserCart = JSON.parse(localStorage.getItem("user")) || null ;
let cartCount = document.querySelector("#cart-count");
if(loggedInUser){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.products.length;
}

//------------ essentials fetching  ---------------//
async function fetchProductsBlutoothSpeakers() {
    try{
        let res = await fetch(`${bluetoothSpeakersURL}`);
        let data = await res.json();
        console.log("BlutoothSpeakers",data);
        bluetoothSpeakerList = data;
        bluetoothSpeakersListDiv.innerHTML = "";
        appendProductsToDOM( bluetoothSpeakerList, bluetoothSpeakersListDiv); 
    }catch(error){
        console.log(error);
    }
}
fetchProductsBlutoothSpeakers();

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

//----------- for debouncing realtime searach  ----------//
let searchAirpodsList ;
async function fetchAirpodsForSearch(url,query="") {
    try{
        let res = await fetch(`${url}${query}`);
        let data = await res.json();
        console.log("Airpods",data);
        searchAirpodsList = data;
        searchResultListDiv.innerHTML = "";
        appendProductsToSearchDOM( searchAirpodsList, searchResultListDiv) ;
    }catch(error){
        console.log(error);
    }
}
let searchInput =  document.querySelector(".search-input") ;
searchInput.addEventListener("input",()=>{
    storedDebounceFunc()
} ) ;
function searchDebounce( fetchfun,delay){
    let timer ;
    return function(){
        if(timer){
            clearTimeout(timer) ;
        }
        timer = setTimeout( ()=>{ 
            fetchfun(`${bluetoothSpeakersURL}?productName_like=${searchInput.value}`) 
        },delay )  ;
    }
}
let storedDebounceFunc = searchDebounce(fetchAirpodsForSearch,500) ;

let searchResultListDiv = document.querySelector(".search-result-list") ;
function appendProductsToSearchDOM(productList, appendingDiv) {
    // console.log(productList);
    productList?.forEach( (item,index) => {
        let card = createProdudctSearchCard(item,index);
        card.addEventListener("click", ()=>{
            localStorage.setItem("clickedProduct",JSON.stringify(item));
            window.location.href = "singleProduct.html";
        })
        appendingDiv.append(card);
    });
}

function createProdudctSearchCard(item,index){
    let card = document.createElement("div");
    card.className = "search-result-card";

    let thumbnail = document.createElement("div");
    thumbnail.className = "image-container";
    let cardImg = document.createElement("img");
    cardImg.src = `${item.image}`;
    cardImg.alt = "Product Image";

    let productDetails = document.createElement("div");
    productDetails.className = "product-details";
    let name = document.createElement("div");
    name.className = "name";
    name.innerText = `${item.productName}`;

    let description = document.createElement("div");
    description.className = "description";
    description.innerText = `${item.description}`;

    thumbnail.append(cardImg);
    productDetails.append(name,description);

    card.append(thumbnail,productDetails);
    return card ;
}
//----------- for debouncing realtime searach  ----------//

//--------------- for showing navbar search --------------//

let searchResultContent =  document.querySelector(".search-result-content") ;
let searchIcon = document.querySelector("#navbar-search") ;
let searchResultClose = document.querySelector(".search-result-close") ;
searchIcon.addEventListener( "click", ()=>{
    searchResultContent.classList.remove("hide") 
})
searchResultClose.addEventListener( "click", ()=>{
    searchResultContent.classList.add("hide")
})

//------------- for banner crausal -----------------//
const bannerImgArray =["../img/banner-img.png","../img/banner-img.png","../img/banner-image-3.webp","../img/banner-image-5.webp","../img/banner-image-7.webp","../img/products/earbuds-prod-3.webp","../img/products/speaker-prod-1.webp","../img/products/headphone-prod-3.webp","../img/products/watch-prod-2.webp","../img/products/earbuds-prod-4.webp","../img/products/earbuds-prod-2.png"] ;
// let bannerImg = document.querySelector(".banner-img") ;
// let crausalIndex = 0;
// let id = setInterval(() => {
//     if(crausalIndex >= bannerImgArray.length){
//         crausalIndex = 1 ;
//     }
//     crausalIndex++
//     bannerImg.src = bannerImgArray[crausalIndex] ;
// }, 1500);


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


let bluetoothSpeakersListDiv = document.querySelector(".bluetooth-speakers-list") ;


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