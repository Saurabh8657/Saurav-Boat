

let baseURL = "https://boat-mock-server.onrender.com" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;
let cartURL = `${baseURL}/carts`;
//----------- for showing logged in user  -----------//
//----------- for redirecting to profile and admin  -----------//
let signinBtn = document.querySelector(".navbar-signin-btn") ;
let loggedInUser  = JSON.parse(localStorage.getItem("user")) || null ;
let cartCount = document.querySelector("#cart-count");
if(loggedInUser){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.products.length;
}
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
//----------- for showing clicekd product  -----------//
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

    let quantityIncreaseBtn = document.getElementById("quantity-increase-button");
    let quantityDecreaseBtn = document.getElementById("quantity-decrease-button");
    let quantityValue = document.getElementById("quantity-value");
    let addToCartBtn = document.getElementById("add-to-cart-btn");

    quantityDecreaseBtn.addEventListener("click", ()=>{
        if(quantityValue.innerText > 1){
            quantityValue.innerText = parseInt(quantityValue.innerText) - 1;
        }else{
            quantityValue.innerText = 1
        }
    })
    quantityIncreaseBtn.addEventListener("click", ()=>{
        quantityValue.innerText = parseInt(quantityValue.innerText) + 1;
    })

    addToCartBtn.addEventListener("click", ()=>{
        addToCart(data,quantityValue);
    })
}

async function updateCartInDatabase(cart){
    try{
        let response = await fetch(`${cartURL}/${cart.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cart)
        })
        let data = await response.json();
        console.log(data);
        localStorage.setItem("cart", JSON.stringify(cart));
    }catch(error){
        console.log(error);
    }

}
//------------ add to cart logic  ---------------//
function addToCart(data,quantityValue=1){
    if( !loggedInUser ){
        toastIntoAction("Please Login First", "alert");
        setTimeout(() => {
            window.location.href = "login.html";
        },2000)
    }else{
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        data.quantity = parseInt(quantityValue.innerText) 
        if(cart.products.length > 0){
            let flag = false;
            for(let i = 0; i < cart.products.length; i++){
                if(cart.products[i].productName === data.productName ){
                    flag = true;
                    break;
                }
            }
            if(flag){
                toastIntoAction("Product Already Added", "alert");
            }else{
                cart.products.push(data)
                console.log(cart);
                cartCount.innerText = cart.products.length;
                updateCartInDatabase(cart) ;
                toastIntoAction("Product Added To Cart", "success");
            }
        }else {
            console.log(cart);
            cart.products.push(data)
            cartCount.innerText = cart.products.length;
            updateCartInDatabase(cart) ;
            toastIntoAction("Product Added To Cart", "success");
        }
    }
}
/// Toast
let toast = document.querySelector(".toast");
let toastText = document.querySelector(".toast-text");
let toastClose = document.querySelector(".toast-close");

function toastIntoAction(params, type){
  toastText.innerText = params;
  //  toast.classList.remove("hidden");
  toast.className = "";
  toast.classList.add(`${type}`, "toast");
  toastClose.addEventListener("click", ()=>{
     toast.classList.add("hiddentoast");
  })
  setTimeout(()=>{
      toast.classList.add("hiddentoast");
  },4000)
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

//------------- for cart modal  -----------------//
let cartIcon = document.querySelector("#navbar-cart-icon") ;
cartIcon.addEventListener( "click", ()=>{
    window.location.href = "cart.html";
}) 

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