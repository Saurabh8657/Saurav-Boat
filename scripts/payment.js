//------------ URL'S ---------------//
let baseURL = "https://boat-mock-server.onrender.com" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;
let cartURL = `${baseURL}/carts`;

let paymentContainer = document.querySelector(".container") ;

let paymentAmount = JSON.parse(localStorage.getItem("paymentAmount"))
let totalAmount = document.querySelector("#total-amount")
totalAmount.innerText = `$ ${paymentAmount}`

let submitButton = document.querySelector("button");
submitButton.textContent = `Make Payment  $ ${paymentAmount}`;


let paymentCard = document.querySelectorAll(".card") ;
// paymentCard.addEventListener("click", ()=>{
//     paymentContainer.classList.add("scale-up")
// })

//--- for display card form ---//
paymentCard.forEach( (card,index)=>{
    let submitDetailsDiv = document.querySelector(".submit-details") ;
    card.addEventListener("click", ()=>{ 

        submitDetailsDiv.innerHTML = "" ;
        console.log("clicked")
        // Create labels and input elements
        let nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "card-name");
        nameLabel.textContent = "Name on Card:";
        let nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "card-name";
        nameInput.name = "card-name";
        nameInput.placeholder = "Name on Card";

        let numberLabel = document.createElement("label");
        numberLabel.setAttribute("for", "card-number");
        numberLabel.textContent = "Card Number:";
        let numberInput = document.createElement("input");
        numberInput.type = "text";
        numberInput.id = "card-number";
        numberInput.name = "card-number";
        numberInput.placeholder = "Card Number";

        let expiryDiv = document.createElement("div");
        expiryDiv.className = "expiry-div";

        let expiryInside1 = document.createElement("div");
        expiryInside1.className = "expiry-div-inside";
        let expiryLabel = document.createElement("label");
        expiryLabel.setAttribute("for", "card-expiry");
        expiryLabel.textContent = "Expiry Date:";
        let expiryInput = document.createElement("input");
        expiryInput.type = "text";
        expiryInput.id = "card-expiry";
        expiryInput.name = "card-expiry";
        expiryInput.pattern = "(0[1-9]|1[0-2])\/\d{4}";
        expiryInput.placeholder = "MM/YYYY";
        expiryInside1.appendChild(expiryLabel);
        expiryInside1.appendChild(expiryInput);

        let expiryInside2 = document.createElement("div");
        expiryInside2.className = "expiry-div-inside";
        let cvcLabel = document.createElement("label");
        cvcLabel.setAttribute("for", "card-cvc");
        cvcLabel.textContent = "CVC:";
        let cvcInput = document.createElement("input");
        cvcInput.type = "text";
        cvcInput.id = "card-cvc";
        cvcInput.name = "card-cvc";
        cvcInput.pattern = "\d{3}";
        cvcInput.placeholder = "CVC";
        expiryInside2.appendChild(cvcLabel);
        expiryInside2.appendChild(cvcInput);

        expiryDiv.appendChild(expiryInside1);
        expiryDiv.appendChild(expiryInside2);

        let submitButton = document.createElement("button");
        submitButton.className = "submit-button";
        submitButton.textContent = `Make Payment ${paymentAmount}`;
        submitButton.addEventListener("click", ()=>{
            makePaymentForUser()
        })

        // Append created elements to the submitDetailsDiv
        submitDetailsDiv.append(nameLabel);
        submitDetailsDiv.append(nameInput);
        submitDetailsDiv.append(numberLabel);
        submitDetailsDiv.append(numberInput);
        submitDetailsDiv.append(expiryDiv);
        submitDetailsDiv.append(submitButton);

    })
})


let makePaymentBtn = document.querySelector(".submit-button") ;
makePaymentBtn.addEventListener("click", ()=>{
    makePaymentForUser()
})

function  makePaymentForUser(){
    localStorage.removeItem("paymentAmount")
    let cart = JSON.parse(localStorage.getItem("cart"))
    cart.products = [] ;
    updateCartOfUser(cart)
    alert("Payment Successfull")
    setTimeout(()=>{
        window.location.href = "index.html"
    },2000)
}
async function updateCartOfUser(cart) {
    try {
        let res = await fetch(`${cartURL}/${cart.id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(cart)
        });
        let data = await res.json();
        console.log(data);
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch(error) {
        console.log(error);
    }
}

