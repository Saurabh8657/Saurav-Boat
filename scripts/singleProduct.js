

let baseURL = "https://boat-mock-server.onrender.com" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;

let singleProduct = JSON.parse(localStorage.getItem("clickedProduct"))
let relatedProductList  ;
displaySingleProduct(singleProduct)

function displaySingleProduct(data){
    console.log(data)
    let singleProductImg = document.getElementById("single-product-img");
    let singleProductName = document.getElementById("single-product-name");
    let singleProductPrice = document.getElementById("single-product-price");
    let singleProductDesc = document.getElementById("single-product-desc");
    singleProductImg.src = data.image 
    singleProductName.innerText = data.productName
    singleProductPrice.innerText = data.price
    singleProductDesc.innerText = data.description

    let quantityIncreaseBtn = document.getElementById("quantity-decrease-button");
    let quantityValue = document.getElementById("quantity-value");
    let quantityDecreaseBtn = document.getElementById("quantity-increase-button");
}
//------------ essentials fetching  ---------------//
async function fetchRelatedProducts() {
    try{
        let category =  singleProduct.category ;
        let res = await fetch(`${baseURL}/${category}`);
        let data = await res.json();
        console.log(data);
        relatedProductList = data;
        relatedProductListDiv.innerHTML = "";
        appendProductsToDOM( relatedProductList, relatedProductListDiv );
    }catch(error){
        console.log(error);
    }
}
fetchRelatedProducts() ;
let relatedProductListDiv = document.querySelector(".related-products-list") ;
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
    let categoryToFetch ;
    if(singleProduct.category==="airpods"){
        categoryToFetch = airpodsURL ;
    }else if(singleProduct.category==="headphones"){
        categoryToFetch = headphonesURL ;
    }else if(singleProduct.category==="bluetoothSpeaker"){
        categoryToFetch = bluetoothSpeakersURL ;
    }else if(singleProduct.category==="smartWatches"){
        categoryToFetch = smartWatchURL ;
    }
    let timer ;
    return function(){
        if(timer){
            clearTimeout(timer) ;
        }
        timer = setTimeout( ()=>{ 
            
            fetchfun(`${categoryToFetch}?productName_like=${searchInput.value}`) 
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

//------------- for redirecting to payment page  -----------------//
let checkoutBtn = document.querySelector(".checkout-btn") ;
checkoutBtn.addEventListener( "click", ()=>{
    window.location.href = "payment.html" ;
})


