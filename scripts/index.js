let baseURL = "http://localhost:3000" ;
let userURL = `${baseURL}/users`;

/////////// essentials fetching
async function fetchProductsHeadphones() {
    try{
        let res = await fetch(`${baseURL}/headphones`);
        let data = await res.json();
        console.log(data);
        localStorage.setItem("headphones", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}
async function fetchProductsAirpods() {
    try{
        let res = await fetch(`${baseURL}/airpods`);
        let data = await res.json();
        console.log(data);
        localStorage.setItem("airpods", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}
async function fetchProductsBlutoothSpeakers() {
    try{
        let res = await fetch(`${baseURL}/bluetoothSpeaker`);
        let data = await res.json();
        console.log(data);
        localStorage.setItem("bluetoothSpeaker", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}
async function fetchProductsNeckbands() {
    try{
        let res = await fetch(`${baseURL}/neckband`);
        let data = await res.json();
        console.log(data);
        localStorage.setItem("neckband", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}
fetchProductsHeadphones();
fetchProductsAirpods();
fetchProductsBlutoothSpeakers();
fetchProductsNeckbands();
let headphonesList = JSON.parse(localStorage.getItem("headphones"));
let airpodsList = JSON.parse(localStorage.getItem("airpods"));
let bluetoothSpeakerList = JSON.parse(localStorage.getItem("bluetoothSpeaker"));
let neckbandList = JSON.parse(localStorage.getItem("neckband"));

async function fetchCart() {
    try {
        let res = await fetch(`${baseURL}/carts`);
        let data = await res.json();
        console.log(data);
        for (const cart of data) {
            if (cart.id === userData.id) {
                localStorage.setItem("cart", JSON.stringify(cart));
                break;
            }
        }
    } catch(error) {
        console.log(error);
    }
}
fetchCart();
let cartItemList = JSON.parse(localStorage.getItem("cart"));



////for showing logged in user
let signinBtn = document.querySelector(".navbar-signin-btn") ; 
let userData = JSON.parse(localStorage.getItem("user"));
// signinBtn.innerText = `Hi ${userData.Name}`
signinBtn.addEventListener("click", ()=>{
    if(signinBtn.innerText === "SIGNIN/SIGNUP"){
        window.location.href = "login.html";
    }else if (signinBtn.innerText === "Admin"){
        window.location.href = "admin.html";
    }else{
        window.location.href = "profile.html";
    }
})

///for cart modal
let cartIcon = document.querySelector("#navbar-cart-icon") ;

let cartPanel = document.querySelector(".cart-panel") ;
let opacLayer = document.querySelector(".opac-layer") ;
let cartContent = document.querySelector(".cart-content") ;

cartIcon.addEventListener( "click", ()=>{
    cartPanel.classList.add("show-cart") 
}) 

///for navbar search
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

/// for redirecting to payment
let checkoutBtn = document.querySelector(".checkout-btn") ;
checkoutBtn.addEventListener( "click", ()=>{
    window.location.href = "payment.html" ;
})


/////////for banner crausal
const bannerImgArray =["../img/banner-img.png","../img/banner-img.png","../img/banner-image-3.webp","../img/banner-image-5.webp","../img/banner-image-7.webp","../img/products/earbuds-prod-3.webp","../img/products/speaker-prod-1.webp","../img/products/headphone-prod-3.webp","../img/products/watch-prod-2.webp","../img/products/earbuds-prod-4.webp","../img/products/earbuds-prod-2.png"] ;
let bannerImg = document.querySelector(".banner-img") ;
let crausalIndex = 0;
// bannerImg.src = "";
let id = setInterval(() => {
    if(crausalIndex >= bannerImgArray.length){
        crausalIndex = 0 ;
    }
    crausalIndex++
    bannerImg.src = bannerImgArray[crausalIndex] ;
}, 1500);

//////////////////////////////////////////////////

// let baseUrl = `https://mockserver-aq5n.onrender.com`;
// let passbookUrl = `${baseUrl}/passbook`;
// let userUrl = `${baseUrl}/users`;
// let profilePicture = document.getElementById("profile-picture")
// let passbookArray = document.querySelector(".transactions-wrapper");
// let userName = document.querySelector("#user-name");
// // let totalBalance = document.querySelector(".total-balance-amount");
// // let passbookData;
// // let userData = JSON.parse(localStorage.getItem("user"));
// let addToWallet = document.getElementById("wallet");


// function appendToDOM(customers) {
//     passbookArray.innerHTML = "";
//     // let h3 = document.createElement("h3");
//     // h3.id = "transaction";
//     // h3.innerText = "Transactions";
//     // passbookArray.append(h3);
//     for(let i=customers.length-1; i>=customers.length-3 && i>-1; i--){
//         let customer1 = singleCard(customers[i]);
//         passbookArray.append(customer1)
//     }
// }


// function singleCard(item) {
//     let singleCard = document.createElement("div");
//     singleCard.className = "singlecustomer";

//     let imageBox = document.createElement("div")
//     imageBox.className = "image_r";

//     let image = document.createElement("img")
//     image.src = "https://as2.ftcdn.net/v2/jpg/00/75/13/25/1000_F_75132523_xkLZqbPQkUvVzWSftTf3nAGBjBFkcKuP.jpg"
//     image.alt = "customer";
//     imageBox.append(image)

//     let customerDetail = document.createElement("div");
//     customerDetail.className = "customerDetails"

//     let customerStatus = document.createElement("div");
//     customerStatus.classList.add("name_status", "common");

//     let name = document.createElement("h5");
//     name.className = "h5";
//     name.innerText = item.from ? item.from : userData.firstName ;

//     let status = document.createElement("p");
//     if(item.type === "debit"){
//         status.innerText = `${item.title} to ${item.recipient}`;
//     }else{
//         status.innerText = `${item.title} from ${item.from}`;
//     }
//     customerStatus.append(name, status)

//     let ammountBox = document.createElement("div");
//     ammountBox.classList.add("amount", "common");

//     let amount = document.createElement("h5")
//     amount.className = "dollar";
//     if (item.type === 'credit') {
//         amount.innerText = `+$${item.amount} `
//         amount.style.color = 'green'
//     } else {
//         amount.innerText = `-$${item.amount} `
//         amount.style.color = 'red'
//     }

//     let date = document.createElement("p");
//     date.innerText = item.date;
//     ammountBox.append(amount, date)

//     customerDetail.append(customerStatus, ammountBox)
//     singleCard.append(imageBox, customerDetail)

//     return singleCard
// }

// async function fetchData(id) {
//     try {
//         let res = await fetch(`${passbookUrl}/${id}`);
//         let data = await res.json();
//         passbookData = data;
//         if(passbookData.transactions.length === 0){
//             printEmpty();
//         }else{
//             appendToDOM(passbookData.transactions);
//         }
//         // appendToDOM(passbookData.transactions);
//         profilePictureChange(userData)
//         totalBalanceDynamic(passbookData);

//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// }
// fetchData(userData.id);

// function printEmpty(){
//     return passbookArray.innerText = `No transactions yet!`;
// }

// function userCardDynamic(item){
//     userName.innerText = `${item.firstName} ${item.lastName}.`;
// }
// userCardDynamic(userData);


// function totalBalanceDynamic(item){
//     console.log(item)
//     totalBalance.innerText = `$${item.amount}.00`;
// }

// function profilePictureChange(userData){
//     console.log(userData.userImage);
//     profilePicture.src=`${userData.userImage}`
// };

// addToWallet.addEventListener("click", ()=>{
//     localStorage.setItem("wallet", JSON.stringify(true));
// })