//------------ URL'S ---------------//

let baseURL = "https://boat-mock-server.onrender.com" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;
let cartURL = `${baseURL}/carts`;

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
let cartProducts = cart.products || []

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
    let addToCartMessage = document.createElement("h2");
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
    let quantityDecreaseBtn = document.createElement("span");
    quantityDecreaseBtn.innerText = "-";
    let quantityIncreaseBtn = document.createElement("span");
    quantityIncreaseBtn.innerText = "+";
    let quantityValue = document.createElement("span");
    quantityValue.innerText = `${item.quantity}`;

    quantityDecreaseBtn.addEventListener("click", ()=>{
        if(quantityValue.innerText > 1){
            quantityValue.innerText = parseInt(quantityValue.innerText) - 1;
            updateQuantityInCart(item,index,quantityValue.innerText);
        }else{
            quantityValue.innerText = 1
        }
    })
    quantityIncreaseBtn.addEventListener("click", ()=>{
        quantityValue.innerText = parseInt(quantityValue.innerText) + 1;
        updateQuantityInCart(item,index,quantityValue.innerText);
    })
    
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
    quantityButtonsDiv.append(quantityDecreaseBtn, quantityValue, quantityIncreaseBtn);
    productTotalDiv.append(cartProductQuantity, multiplyMark, itemTotalPrice);

    card.append(thumbnail, productNameDiv, quantityButtonsDiv, productTotalDiv, deleteIcon);

    return card ;
}

//----- for sumarray amounts of cart -------//
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

//----- for updating quantity in cart  -------//
async function updateQuantityInCart(item,index,quantityValue){
    cartProducts[index].quantity = quantityValue ;
    cart.products = cartProducts ;
    localStorage.setItem("cart", JSON.stringify(cart));
    try{
        let response = await fetch(`${cartURL}/${cart.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cart),
            
        })
    }catch(error){
        console.log(error);
    }

}

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