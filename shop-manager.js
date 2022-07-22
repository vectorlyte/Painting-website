const paintingsForSale = [
    {thumbnail: "IMG_2007 - Copy (2)2.JPG", 
    title: "Emerald Pines", 
    price: 125,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa aperiam quas obcaecati impedit cum nulla soluta pariatur? Illum, sed!",
    inCart: false}, 

    {thumbnail: "IMG_2012 (2).JPG", 
    title: "Industrial Glow", 
    price: 125,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa aperiam quas obcaecati impedit cum nulla soluta pariatur? Illum, sed!",
    inCart: false}, 

    {thumbnail: "IMG_2033 (2)2.JPG", 
    title: "The Aviator", 
    price: 125, 
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa aperiam quas obcaecati impedit cum nulla soluta pariatur? Illum, sed!",
    inCart: false}, 

    {thumbnail: "IMG_2063 (2)2.JPG", 
    title: "Island Tour", 
    price: 125, 
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa aperiam quas obcaecati impedit cum nulla soluta pariatur? Illum, sed!",
    inCart: false}, 

    {thumbnail: "IMG_2073 (2)2.JPG", 
    title: "Lake Sunset", 
    price: 125,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa aperiam quas obcaecati impedit cum nulla soluta pariatur? Illum, sed!",
    inCart: false}, 

    {thumbnail: "IMG_E42272.JPG", 
    title: "Abstract Collection", 
    price: 75,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa aperiam quas obcaecati impedit cum nulla soluta pariatur? Illum, sed!",
    inCart: false}, 

    {thumbnail: "IMG_2044 (2).JPG", 
    title: "Resting", 
    price: 125,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa aperiam quas obcaecati impedit cum nulla soluta pariatur? Illum, sed!",
    inCart: false}, 

    {thumbnail: "IMG_E42252.JPG", 
    title: "Filters", 
    price: 125,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa aperiam quas obcaecati impedit cum nulla soluta pariatur? Illum, sed!",
    inCart: false}, 

    {thumbnail: "IMG_E42262.JPG", 
    title: "Decommissioned Pool", 
    price: 125,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa aperiam quas obcaecati impedit cum nulla soluta pariatur? Illum, sed!",
    inCart: false}]

const listingContainer = document.getElementById("listing-container");
const modal = document.getElementById("modal");
let cart = [];
if(localStorage){
    checkCart();
}
const cartEl = document.getElementById("cart-items-container");

populateListings();
addListingListener();
// if(modal){
// modal.style.display = "none";
// }
if(cartEl){
    upDateCart();
    removeBtn();
}

function checkCart(){
    let alreadyInCart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < alreadyInCart.length; i++){
        cart.push(alreadyInCart[i]);
        for(let y = 0; y < paintingsForSale.length; y++){
            if(paintingsForSale[y].title == alreadyInCart[i]){
                paintingsForSale[y].inCart = true;
            }
        }
    }
}


function populateListings() {
    let listingContent = "";
    for (let i = 0; i < paintingsForSale.length; i++){
        listingContent += `
                <div class="listing-div">
                <img src="images/${paintingsForSale[i].thumbnail}" alt="">
                <h3 class="listing-title">${paintingsForSale[i].title}</h3>
                <h4 class="listing-price">$${paintingsForSale[i].price}</h4>
                </div>`
    }
    if(listingContainer){
    listingContainer.innerHTML = listingContent;}
}

function addListingListener() {
    const listings = document.querySelectorAll(".listing-div");
    
    listings.forEach((listing) => {
        listing.addEventListener('click', function() {
            let search = listing.children[1].innerText;
            buildModal(search);
        })
    })
}

function buildModal(painting){
    for (let i = 0; i < paintingsForSale.length; i++){
        if(paintingsForSale[i].title == painting){
            modal.innerHTML = `
            <div class="modal-content">
                <img class="listing-modal-img" src="images/${paintingsForSale[i].thumbnail}" alt="">
                <div class="listing-modal-info">
                    <div class="exit-btn" onclick="closeModal()">
                        <span class="X1"></span>
                        <span class="X2"></span>
                    </div>
                    <h3 class="listing-title">${paintingsForSale[i].title}</h3>
                    <p class="listing-modal-desc">${paintingsForSale[i].description}</p>
                    <button id="add-item" onclick="addToCart('${painting}',${i})">add to cart</button>
                </div>
            </div>`
            modal.style.display = "block";
        }
    }
}

function closeModal(){
            modal.style.display = "none";
}

function addToCart(item, index){
    if(paintingsForSale[index]['inCart'] == false){
    paintingsForSale[index]['inCart'] = true;
    console.log(item);
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart))
    upDateCart();
    } else {
        console.log("already in cart!")
    }
}

function upDateCart(){
    let cartHTML = ""
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cartItems.length; i++){
    for (let y = 0; y < paintingsForSale.length; y++){
        if(paintingsForSale[y].title == cartItems[i]){
            cartHTML += `
            <div class="cart-item">
                <img src="images/${paintingsForSale[y].thumbnail}" alt="">
                <h3 class="cart-item-title">${cartItems[i]}</h3>
                <span class="cart-item-price">$${paintingsForSale[y].price}</span>
                <div class="remove-btn">
                    <span class="X1"></span>
                    <span class="X2"></span>
                </div>
            </div>`
        }
    }}
    if(cartEl){
    cartEl.innerHTML = cartHTML;
    removeBtn();
    }
}

function removeBtn() {
    buttons = document.querySelectorAll('.remove-btn')
    buttons.forEach((button) => {
        button.addEventListener('click', function() {
            let removedItem = button.parentElement.querySelector('.cart-item-title').innerText;
            cart = JSON.parse(localStorage.getItem("cart"));

            let newCart = [];

            for(let i = 0; i < cart.length; i++){
                if(cart[i] == removedItem){
                    //Dont do anything
                } else {
                    newCart.push(cart[i]);
                }
            }

            localStorage.setItem("cart", JSON.stringify(newCart))

            upDateCart();
        })
    })
}

