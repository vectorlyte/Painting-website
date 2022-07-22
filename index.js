
const navLinks = document.querySelectorAll('.navLink');
const sections = document.querySelectorAll('section')
const r = document.querySelector(':root');
const rs = getComputedStyle(r);
const styles = document.styleSheets;
let id = "";
let index = 0;
let prevSec = sections[0];
let prevIndex;

checkHash();

window.onhashchange = function() {
checkHash();
}

function displaySection(currentSec){
    for(let i = 0; i < sections.length; i++){
        if(currentSec != prevSec){

            if(sections[i] == currentSec){  
                r.style.setProperty(`--${sections[i].getAttribute('id')}-overflow`, "visible");
                index = i;
            } else if(sections[i] == prevSec){
                prevIndex = i;
                r.style.setProperty(`--${sections[i].getAttribute('id')}-overflow`, "hidden");
            } else {
                r.style.setProperty(`--${sections[i].getAttribute('id')}-overflow`, "hidden");
            }

        switch(sections[i]){
            case currentSec:
            sections[i].style.zIndex = "2";
            break;
            case prevSec:
                sections[i].style.zIndex = "1";
                sections[i].style.left = "0";
                sections[i].style.animation = "fade";
                sections[i].style.animationDuration = ".4s";
                sections[i].style.animationFillMode = 
                "forwards";
            break;
            default:
            sections[i].style.zIndex = "0";
            sections[i].style.left = "0";
            sections[i].style.animation = "";
            sections[i].style.animationDuration = "";
            sections[i].style.animationFillMode = "";
            sections[i].style.opacity = 0;
        }

        if(i+1 == sections.length){
            prevSec = currentSec;
            currentSec.style.animation = findAnimation();
            currentSec.style.animationDuration = ".9s";
            currentSec.style.animationFillMode = "forwards";
            currentSec.style.opacity = 1;
        };
    }
}

}

function findAnimation() {
    if(index > prevIndex){
        return "slideInRight";
    } else {
        return "slideInLeft";
    }
}

navLinks.forEach((navLink) => {
    navLink.addEventListener('click', function(){
        id = navLink.getAttribute('id');
        parent.location.hash = id.substring(0,id.length-4)+"Page"
        setLocation(id);
        window.scrollTo(0,0);

    })
});

function setLocation(location) {
            switch(location){
            case navLinks[0].getAttribute("id"):
                displaySection(sections[0]);
            break;
            case navLinks[1].getAttribute("id"):
                displaySection(sections[1]);
            break;
            case navLinks[2].getAttribute("id"):
                displaySection(sections[2]);
            break;
            case navLinks[3].getAttribute("id"):
                displaySection(sections[3]);
            break;
        }
}

function checkHash() {
    if(window.location.hash){
        let hash = window.location.hash;
        setLocation(hash.substring(1, hash.length).substring(0, hash.length-5) + "-btn");
    } else {
        parent.location.hash = "homePage"
    }
}   