// let cartIcon = document.querySelector(".cart-icon") ;
// let opacLayer = document.querySelector(".opac-layer") ;
// let cartContent = document.querySelector(".cart-content") ;

// cartIcon.style.color = "red" ; 
// cartIcon.addEventListener( "click", ()=>{
//     window.location.href = "cart.html"
// })

const baseURL = "http://localhost:1337" ;
const productsURL = "http://localhost:1337/api/products?populate=*" ;
const categoriesURL = "http://localhost:1337/api/categories?populate=*" ;

const jwt = "af6db04bba1cf248596a9faa0a9ac08f21b3bef071aaf6e7084fe9b81b3cb9614b713239fe05d4f0ccfdd8439d237c0ad3a89a475aa78d4aed86d8cb999af55039b83711194792f57a3d23a2bddea04ef9a03b8178045cc83de3ef097da509c2ec3ba2cabf4eb9c297db224c3e7244732843bb2952b053d8f8f68aeb26830948"

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
let headphoneList = document.querySelector(".headphone-list") ;
// let smartWatchesList = document.querySelector(".smart-watches-list") ;
// let airpodsList = document.querySelector(".airpods-list") ;
// let blutoothSpeakersList = document.querySelector(".blutooth-speakers-list") ;

fetchData(productsURL,"") ;

function displayProducts(data){
    headphoneList.innerHTML="";
    // smartWatchesList.innerHTML="";
    // airpodsList.innerHTML="";
    // blutoothSpeakersList.innerHTML="";
    data.forEach( (item,index) => {
        
        // if(item.attributes.categories.data[0].attributes.title=="Smart Watches"){
        //     smartWatchesList.append(card) ;
        // }
        if(item.attributes.categories.data[0].attributes.title=="Headphones"){
            let card = createProductsCard(item,index) ;
            headphoneList.append(card) ;
        }
        // if(item.attributes.categories.data[0].attributes.title=="Wireless Earbuds"){
        //     airpodsList.append(card) ;
        // }
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