// let cartIcon = document.querySelector(".cart-icon") ;
// let opacLayer = document.querySelector(".opac-layer") ;
// let cartContent = document.querySelector(".cart-content") ;

// cartIcon.style.color = "red" ; 
// cartIcon.addEventListener( "click", ()=>{
//     window.location.href = "cart.html"
// })
let paramString = urlString.split('?')[1];
let params_arr = paramString.split('&');
for (let i = 0; i < params_arr.length; i++) {
   let pair = params_arr[i].split('=');
   console.log("Key is:", pair[0]);
   console.log("Value is:", pair[1]);
}

let baseURL = "https://boat-mock-server.onrender.com" ;
let headphonesURL = `${baseURL}/headphones`;
let airpodsURL = `${baseURL}/airpods`;
let bluetoothSpeakersURL = `${baseURL}/bluetoothSpeaker`;
let smartWatchURL = `${baseURL}/smartWatches`;
let userURL = `${baseURL}/users`;

async function fetchData(url,query=""){
    try{
        let res = await fetch(`${url}${query}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        }) ;
        let data = await res.json() ;
        console.log(data.data) ;
        if(url===productsURL){
            displayProducts(data.data) ;
        }else if(url===categoriesURL){
            displayCategories(data.data) ;
        }
    }catch(error){
        console.log(error) ;
    }
    
}


////// for categories
let categoriesList = document.querySelector(".categories") ;
fetchData(categoriesURL,"") ;

function displayCategories(data){
    categoriesList.innerHTML="";
    data.forEach( (item,index) => {
        let card = createCategoryCard(item,index) ;
        categoriesList.append(card) ;
    });
}
function createCategoryCard(item,index){
    let cardImg = document.createElement("div") ;
    cardImg.classList.add("category") ;

    cardImg.addEventListener("click", ()=>{
        if(item.attributes.title==="Smart Watches"){
            window.location.href = "smart_watch.html";
        }
        if(item.attributes.title==="Headphones"){
            window.location.href = "headphones.html";
        }
        if(item.attributes.title==="Bluetooth Speakers"){
            window.location.href = "blutooth_speakers.html";
        }
        if(item.attributes.title==="Wireless Earbuds"){
            window.location.href = "airpods.html";
        }
    })

    let img = document.createElement("img") ;
    // console.log(item.attributes.img.data.attributes.url)
    img.src = `${baseURL}${item.attributes.img.data.attributes.url}`
    cardImg.append(img) ;
    return cardImg ;
}


////// for products
let airpodsList = document.querySelector(".airpods-list") ;
// let headphoneList = document.querySelector(".headphone-list") ;
// let smartWatchesList = document.querySelector(".smart-watches-list") ;
// let blutoothSpeakersList = document.querySelector(".blutooth-speakers-list") ;

fetchData(productsURL,"") ;

function displayProducts(data){
    airpodsList.innerHTML="";
    // headphoneList.innerHTML="";
    // smartWatchesList.innerHTML="";
    // blutoothSpeakersList.innerHTML="";
    data.forEach( (item,index) => {
        
        // if(item.attributes.categories.data[0].attributes.title=="Smart Watches"){
        //     smartWatchesList.append(card) ;
        // }
        // if(item.attributes.categories.data[0].attributes.title=="Headphones"){
        //     headphoneList.append(card) ;
        // }
        if(item.attributes.categories.data[0].attributes.title=="Wireless Earbuds"){
            let card = createProductsCard(item,index) ;
            airpodsList.append(card) ;
        }
        // if(item.attributes.categories.data[0].attributes.title=="Bluetooth Speakers"){
        //     blutoothSpeakersList.append(card) ;
        // }
    });
}
function createProductsCard(item,index){
    let card = document.createElement("div") ;
    card.classList.add("product-card") ;

    let cardImg = document.createElement("div") ;
    cardImg.classList.add("thumbnail") ;

    let img = document.createElement("img") ;
    console.log(item.attributes.img.data[0].attributes.url)
    img.src = `${baseURL}${item.attributes.img.data[0].attributes.url}`
    cardImg.append(img) ;


    let cardDetails = document.createElement("div") ;
    cardDetails.classList.add("product-details") ;

    let title = document.createElement("div") ;
    title.classList.add("name") ;
    title.innerText = `${item.attributes.title}` ;

    let price = document.createElement("div") ;
    price.classList.add("price") ;
    price.innerText = `${item.attributes.price}` ;

    cardDetails.append(title,price) ;

    card.append(cardImg,cardDetails) ;

    return card ;
}
