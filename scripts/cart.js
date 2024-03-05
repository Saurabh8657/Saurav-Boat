//------------ URL'S ---------------//

let baseURL = "https://boat-mock-server.onrender.com" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;

let loggedInUser  = JSON.parse(localStorage.getItem("user")) || null ;

//----------- for showing logged in user  -----------//
//----------- for redirecting to profile and admin -----------//
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
cartIcon.addEventListener( "click", ()=>{
    window.location.href = "cart.html";
}) 

//------------ for cart logic  ---------------//
let cart = JSON.parse(localStorage.getItem("cart")) || [] ;
let cartProducts = cart.products ;

let cartProductListDiv = document.querySelector(".cart-products-list-div") ;
let subTotalAmount = document.querySelector(".sub-total-amount");
let discountAmount = document.querySelector(".discount-amount");
let DeliveryAmount = document.querySelector(".Delivery-amount");
let totalAmount = document.querySelector(".total-amount")

let subTotalAmountValue = 0;
let discountAmountValue = 0;
let DeliveryAmountValue = 0;
let totalAmountValue = 0;

if(cartProducts.length === 0){
    cartProductListDiv.innerHTML = "";
    let addToCartMessage = document.createElement("p");
    addToCartMessage.innerText = "No items in cart";
    cartProductListDiv.append(addToCartMessage);
    subTotalAmount.innerText = `₹ ${subTotalAmountValue}`;
    discountAmount.innerText = `₹ ${discountAmountValue}`;
    DeliveryAmount.innerText = `₹ ${DeliveryAmountValue}`;
    totalAmount.innerText = `₹ ${totalAmountValue}`;
}else{
    cartProductListDiv.innerHTML = "";
    appendProductsInCart(cartProducts,cartProductListDiv);
    findTotalAmounts(cartProducts);
}

 function appendProductsInCart(cartProductsList,cartProductListDiv){
    
    cartProductsList?.forEach( (item,index) => {
        let card = createCartProductsCard(item,index);
        cartProductListDiv.append(card);
    })
}

function createCartProductsCard(item,index){
    let card = document.createElement("div");
    card.className = "product-card";

    let thumbnail = document.createElement("div");
    thumbnail.className = "img-container";
    let cardImg = document.createElement("img");
    cardImg.src = `${item.image}`;
    cardImg.alt = "Product Image";

    let productNameDiv = document.createElement("div");
    productNameDiv.className = "details-div ";
    let productName = document.createElement("div");
    productName.className = "name";
    productName.innerText = `${item.productName}`;

    let quantityButtonsDiv = document.createElement("div");
    quantityButtonsDiv.className = "quantity-buttons ";
    let minus = document.createElement("span");
    minus.innerText = "-";
    let plus = document.createElement("span");
    plus.innerText = "+";
    let itemQuantity = document.createElement("span");
    itemQuantity.innerText = `${item.quantity}`;
    
    let productTotalDiv = document.createElement("div");
    productTotalDiv.className = "product-total-div ";
    let cartProductQuantity = document.createElement("span");
    cartProductQuantity.className = "cart-product-quantity";
    cartProductQuantity.innerText = `${item.quantity}`;
    let multiplyMark = document.createElement("span");
    multiplyMark.innerText = "x" ;
    let itemTotalPrice = document.createElement("span");
    itemTotalPrice.className = "cart-product-price";
    const numericValue = parseFloat(item.price.replace(/[^\d.]/g, ''));
    itemTotalPrice.innerText = `${numericValue*item.quantity}`;

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash ";
    
    thumbnail.append(cardImg);
    productNameDiv.append(productName);
    quantityButtonsDiv.append(minus, itemQuantity, plus);
    productTotalDiv.append(cartProductQuantity, multiplyMark, itemTotalPrice);

    card.append(thumbnail, productNameDiv, quantityButtonsDiv, productTotalDiv, deleteIcon);

    return card ;
}

function findTotalAmounts(cartProducts){
    subTotalAmountValue = 0;
    discountAmountValue = 20;
    DeliveryAmountValue = 10;
    totalAmountValue = 0;
    for(let i=0; i<cartProducts.length; i++){
        const numericValue = parseFloat(cartProducts[i].price.replace(/[^\d.]/g, ''));
        const quantity = cartProducts[i].quantity ;
        subTotalAmountValue += numericValue*quantity ;
    }
    subTotalAmount.innerText = `$ ${Math.round(subTotalAmountValue)}`;
    discountAmount.innerText = `$ ${discountAmountValue}`;
    DeliveryAmount.innerText = `$ ${DeliveryAmountValue}`;
    totalAmount.innerText = `$ ${Math.round(subTotalAmountValue - discountAmountValue + DeliveryAmountValue)}`;
}

let checkoutBtn = document.querySelector(".checkout-btn");
checkoutBtn.addEventListener( "click", ()=>{
    window.location.href = "payment.html";
})