//------------ URL'S ---------------//

let baseURL = "https://boat-mock-server.onrender.com" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;
let cartURL = `${baseURL}/carts`;

let loggedInUser  = JSON.parse(localStorage.getItem("user")) || null ;
let cartCount = document.querySelector("#cart-count");
if(loggedInUser){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = cart.products.length;
}
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

function mainCartFunction(){
    if(!loggedInUser){
        cartProductListDiv.innerHTML = "";
        let addToCartMessage = document.createElement("h2");
        addToCartMessage.innerText = "Please Login To Add Products In Cart";
        cartProductListDiv.append(addToCartMessage);
    }else{
        cart = JSON.parse(localStorage.getItem("cart")) || [] ;
        cartProducts = cart.products || []
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
    }
    
}
mainCartFunction()

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
            updateQuantityInCart(item,index,quantityValue.innerText)
            findTotalAmounts(cartProducts)
        }else{
            quantityValue.innerText = 1
        }
    })
    quantityIncreaseBtn.addEventListener("click", ()=>{
        quantityValue.innerText = parseInt(quantityValue.innerText) + 1;
        updateQuantityInCart(item,index,quantityValue.innerText)
        findTotalAmounts(cartProducts) 
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
    itemTotalPrice.innerText = ` ${item.price}`;

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash ";
    deleteIcon.addEventListener("click", ()=>{
        deleteItemInCart(item,index)
    })
    
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
        console.log(numericValue,quantity,subTotalAmountValue)
    }
    subTotalAmount.innerText = "" ;
    discountAmount.innerText = "";
    DeliveryAmount.innerText = "";
    totalAmount.innerText = "" ;
    subTotalAmount.innerText = `$ ${Math.round(subTotalAmountValue)}`;
    discountAmount.innerText = `$ ${discountAmountValue}`;
    DeliveryAmount.innerText = `$ ${DeliveryAmountValue}`;
    totalAmount.innerText = `$ ${Math.round(subTotalAmountValue - discountAmountValue + DeliveryAmountValue)}`;

}

let checkoutBtn = document.querySelector(".checkout-btn");
checkoutBtn.addEventListener( "click", ()=>{
    let paymentAmount = document.querySelector(".total-amount").innerText.replace("$ ",""); 
    if(paymentAmount === ""){
        alert("Please add items in cart");
    }else{
        localStorage.setItem("paymentAmount", paymentAmount);
        window.location.href = "payment.html";
    }
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
            body: JSON.stringify(cart)
        })
        let data = await response.json();
        console.log(data);
        mainCartFunction()
    }catch(error){
        console.log(error);
    }

}

//----- for deleting item in cart  -------//
async function deleteItemInCart(item,index){
    cartProducts.splice(index,1);
    cart.products = cartProducts ;
    localStorage.setItem("cart", JSON.stringify(cart));
    try{
        let response = await fetch(`${cartURL}/${cart.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cart)
        })
        let data = await response.json();
        console.log(data);
        mainCartFunction()
    }catch(error){
        console.log(error);
    }

}


//--- for cupon apply ---//
let applyCuponBtn = document.querySelector(".apply-cupon-btn");
let inputCupon = document.querySelector(".input-cupon");
applyCuponBtn.addEventListener("click", ()=>{
    let inputCuponValue = inputCupon.value ;
    let updatedTotalAmount = document.querySelector(".total-amount")
    totalAmountValue = updatedTotalAmount.innerText.replace("$ ","")
    let updatedDiscountAmount = document.querySelector(".discount-amount")
    discountAmountValue = parseInt(updatedDiscountAmount.innerText.replace("$ ",""))
    if(inputCuponValue === "BOAT50" ){
        if(totalAmountValue > 500){
            totalAmount.innerText = `$ ${totalAmountValue - 50}`;
            discountAmount.innerText = `$ ${discountAmountValue + 50}`
        }else{
            alert("Coupon redeamable for Total Amount more than 500")
        }
    }else if(inputCuponValue === "BOAT100" ){
        if(totalAmountValue > 1000){
            totalAmount.innerText = `$ ${totalAmountValue - 100}`;
            discountAmount.innerText = `$ ${discountAmountValue + 100}`
        }else{
            alert("Coupon redeamable for Total Amount more than 1000")
        }
    }else {
        alert("Invalid Cupon")
    }
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