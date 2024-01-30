////for signin and signup name to user name
let signinBtn = document.querySelector(".navbar-signin-btn") ; 
signinBtn.textContent = " Admin" ;


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

///for cart modal
let cartIcon = document.querySelector("#navbar-cart-icon") ;

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
// bannerImg.src = "";
let id = setInterval(() => {
    if(crausalIndex >= bannerImgArray.length){
        crausalIndex = 0 ;
    }
    crausalIndex++
    bannerImg.src = bannerImgArray[crausalIndex] ;
}, 1500);