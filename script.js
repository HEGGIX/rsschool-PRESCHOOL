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