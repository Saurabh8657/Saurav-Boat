///for cart modal
let cartIcon = document.querySelector("#navbar-cart-icon") ;
// let cartPanel = document.querySelector(".cart-panel") ; 

let cartPanel = document.querySelector(".cart-panel") ;
let opacLayer = document.querySelector(".opac-layer") ;
let cartContent = document.querySelector(".cart-content") ;

cartIcon.addEventListener( "click", ()=>{
    cartPanel.classList.add("show-cart") 
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
bannerImg.src = "";
let id = setInterval(() => {
    if(crausalIndex >= bannerImgArray.length){
        crausalIndex = 0 ;
    }
    crausalIndex++
    bannerImg.src = bannerImgArray[crausalIndex] ;
}, 1500);