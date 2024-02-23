//------------ URL'S ---------------//

let baseURL = "https://zany-seal-pantsuit.cyclic.app/" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;


let headphoneList ;
// let airpodsList ;
// let bluetoothSpeakerList ;
// let smartWatcheList ;

let loggedInUser  = JSON.parse(localStorage.getItem("user")) || null ;
// let loggedInUserCart ;


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
// async function fetchProductsAirpods() {
//     try{
//         let res = await fetch(`${airpodsURL}`);
//         let data = await res.json();
//         console.log("Airpods",data);
//         airpodsList = data;
//         // localStorage.setItem("airpods", JSON.stringify(data));
//     }catch(error){
//         console.log(error);
//     }
// }
// async function fetchProductsBlutoothSpeakers() {
//     try{
//         let res = await fetch(`${bluetoothSpeakersURL}`);
//         let data = await res.json();
//         console.log("BlutoothSpeakers",data);
//         bluetoothSpeakerList = data;
//         // localStorage.setItem("bluetoothSpeaker", JSON.stringify(data));
//     }catch(error){
//         console.log(error);
//     }
// }
// async function fetchProductsSmartWatches() {
//     try{
//         let res = await fetch(`${smartWatchURL}`);
//         let data = await res.json();
//         console.log("SmartWatches",data);
//         smartWatcheList = data;
//         console.log(smartWatcheList);
//         smartWatchListDiv.innerHTML = "";
//         appendProductsToDOM( smartWatcheList, smartWatchListDiv );
//         // localStorage.setItem("neckband", JSON.stringify(data));
//     }catch(error){
//         console.log(error);
//     }
// }
fetchProductsHeadphones();
// fetchProductsAirpods();
// fetchProductsBlutoothSpeakers();
// fetchProductsSmartWatches();

// async function fetchCartOfLoggedInUser() {
//     try {
//         let res = await fetch(`${baseURL}/carts`);
//         let data = await res.json();
//         console.log("Carts",data);
//         for (const cart of data) {
//             if (cart.userId === loggedInUser.id) {
//                 localStorage.setItem("cart", JSON.stringify(cart));
//                 break;
//             }
//         }
//     } catch(error) {
//         console.log(error);
//     }
// }
// if(loggedInUser){
//     fetchCartOfLoggedInUser();
// }


//----------- for showing logged in user  -----------//
let signinBtn = document.querySelector(".navbar-signin-btn") ;
if(loggedInUser){
    signinBtn.innerText = `Hi ${loggedInUser.firstName}`
}
signinBtn.addEventListener("click", ()=>{
    if(signinBtn.innerText === "SIGNIN/SIGNUP"){
        window.location.href = "login.html";
    }else if (signinBtn.innerText === "Admin"){
        window.location.href = "admin.html";
    }else{
        window.location.href = "profile.html";
    }
})

//------------- for cart modal  -----------------//
let cartIcon = document.querySelector("#navbar-cart-icon") ;

let cartPanel = document.querySelector(".cart-panel") ;
let opacLayer = document.querySelector(".opac-layer") ;
let cartContent = document.querySelector(".cart-content") ;

cartIcon.addEventListener( "click", ()=>{
    cartPanel.classList.add("show-cart") 
}) 

//--------------- for navbar search --------------//
let searchIcon = document.querySelector("#navbar-search") ;
searchIcon.addEventListener( "click", ()=>{
    // Create search result content container
    let searchResultContent =  document.querySelector(".search-result-content") ;
    // searchResultContent.className = "search-result-content";

    // Create search input element
    let searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "search-input";
    searchInput.placeholder = "Search any category";
    searchInput.id = "search-input";
    searchInput.addEventListener("change", ()=>{
        let searchInputValue = searchInput.value ;
        console.log(searchInputValue) ;

        // Create search result list container
        let searchResultList = document.createElement("div");
        searchResultList.className = "search-result-list";

        // Create first search result card
        let searchResultCard1 = createSearchResultCard("Product Name 1", "Product desc 1", "/img/products/earbuds-prod-3.webp");

        // Create second search result card
        let searchResultCard2 = createSearchResultCard("Product Name 2", "Product desc 2", "/img/products/earbuds-prod-3.webp");

        // Append search result cards to the result list
        searchResultList.appendChild(searchResultCard1);
        searchResultList.appendChild(searchResultCard2);

        searchResultContent.appendChild(searchResultList);
    })

    // Create search heading div
    let searchHeadingDiv = document.createElement("div");
    searchHeadingDiv.className = "search-heading-div";
    
    // Create search result heading
    let searchResultHeading = document.createElement("span");
    searchResultHeading.className = "search-result-heading";
    searchResultHeading.textContent = "Search Results";

    // Create search result close icon
    let searchResultClose = document.createElement("span");
    searchResultClose.className = "search-result-close";
    let closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
    searchResultClose.appendChild(closeIcon);

    // Append heading and close icon to heading div
    searchHeadingDiv.appendChild(searchResultHeading);
    searchHeadingDiv.appendChild(searchResultClose);

    // Append search input, heading div, and result list to the main content container
    searchResultContent.appendChild(searchInput);
    searchResultContent.appendChild(searchHeadingDiv);
    

    // Append the dynamically created elements to the body
    // document.body.appendChild(searchResultContent);

    // Function to create a search result card
    function createSearchResultCard(name, description, imagePath) {
        let searchResultCard = document.createElement("div");
        searchResultCard.className = "search-result-card";

        // Create image container
        let imageContainer = document.createElement("div");
        imageContainer.className = "image-container";

        // Create image element
        let image = document.createElement("img");
        image.src = imagePath;

        // Append image to the image container
        imageContainer.appendChild(image);

        // Create product details container
        let productDetails = document.createElement("div");
        productDetails.className = "product-detalis";

        // Create name and description elements
        let nameElement = document.createElement("div");
        nameElement.className = "name";
        nameElement.textContent = name;

        let descriptionElement = document.createElement("div");
        descriptionElement.className = "description";
        descriptionElement.textContent = description;

        // Append name and description to product details
        productDetails.appendChild(nameElement);
        productDetails.appendChild(descriptionElement);

        // Append image container and product details to the search result card
        searchResultCard.appendChild(imageContainer);
        searchResultCard.appendChild(productDetails);

        return searchResultCard;
    }

})

//------------- for redirecting to payment page  -----------------//
let checkoutBtn = document.querySelector(".checkout-btn") ;
checkoutBtn.addEventListener( "click", ()=>{
    window.location.href = "payment.html" ;
})


//------------- for banner crausal -----------------//
const bannerImgArray =["../img/banner-img.png","../img/banner-img.png","../img/banner-image-3.webp","../img/banner-image-5.webp","../img/banner-image-7.webp","../img/products/earbuds-prod-3.webp","../img/products/speaker-prod-1.webp","../img/products/headphone-prod-3.webp","../img/products/watch-prod-2.webp","../img/products/earbuds-prod-4.webp","../img/products/earbuds-prod-2.png"] ;
let bannerImg = document.querySelector(".banner-img") ;
let crausalIndex = 0;
let id = setInterval(() => {
    if(crausalIndex >= bannerImgArray.length){
        crausalIndex = 1 ;
    }
    crausalIndex++
    bannerImg.src = bannerImgArray[crausalIndex] ;
}, 1500);


//------------- for search result list -----------------//
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