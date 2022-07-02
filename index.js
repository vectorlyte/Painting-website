const homeBtn = "home-btn";
const galleryBtn = "gallery-btn";
const aboutBtn = "about-btn";
const buyBtn = "buy-btn";
const welcomeSection = document.getElementById("welcome");
const gallerySection = document.getElementById("gallery");
const aboutSection = document.getElementById("about");
const storeSection = document.getElementById("store");
const sectionArr = [welcomeSection, gallerySection, aboutSection, storeSection];
const navLinks = document.querySelectorAll('.navLink');
const sections = document.querySelector('section')
const r = document.querySelector(':root');
const rs = getComputedStyle(r);
const styles = document.styleSheets;
let id = "";
let index = 0;

sections.addEventListener('transitionstart', () => {
    hideOverflow();
});

function hideOverflow(){
    for(let i = 0; i < sectionArr.length; i++){
        if(i === index){  
            r.style.setProperty(`--${sectionArr[i].getAttribute('id')}-overflow`, "visible");
        } else {
            r.style.setProperty(`--${sectionArr[i].getAttribute('id')}-overflow`, "hidden");
        }
    }
}


if(localStorage)  {
    index = Math.abs(localStorage.getItem("lastIndex")/100);
    r.style.setProperty('--translate-timing', "0s");
    r.style.setProperty('--next-pos', `0vw`);
    r.style.setProperty('--next-pos', `${localStorage.getItem("lastIndex")}vw`);
    hideOverflow();
}

navLinks.forEach((navLink) => {
    navLink.addEventListener('click', function(){
        id = navLink.getAttribute('id');
        switch(id){
            case homeBtn:
                setIndex(0);
            break;
            case galleryBtn:
                setIndex(-1);
            break;
            case aboutBtn:
                setIndex(-2);
            break;
            case buyBtn:
                setIndex(-3);
            break;
        }

    })
});

function setIndex(num){
    let int = num * 100;
    r.style.setProperty('--prev-pos', rs.getPropertyValue('--index-pos'));
    r.style.setProperty('--next-pos', `${int}vw`);
    r.style.setProperty('--translate-timing', ".7s");
    // console.log(rs.getPropertyValue('--index-pos'));
    // console.log(rs.getPropertyValue('--next-pos'));
    let lastIndex = JSON.stringify(int);
    index = Math.abs(lastIndex/100);
    localStorage.setItem("lastIndex", lastIndex);
}

