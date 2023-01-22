(function (){
    const burgerItem = document.querySelector(".burger");
    const menu = document.querySelector(".nav");
    const menuCloseItem = document.querySelector(".nav_close");
    burgerItem.addEventListener("click", () =>{
        menu.classList.add ("nav_active");
    });
    menuCloseItem.addEventListener("click", () =>{
        menu.classList.remove ("nav_active");
    });
}());

const menuLinks = document.querySelector(".navMenuItem[data-goto]");
if (menuLinks.lenght > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click",onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector("header").offsetHeight;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

console.log("70 " + " баллов")