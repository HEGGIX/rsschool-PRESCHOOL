    (function () {
    const burgerItem = document.querySelector(".burger");
    const menu = document.querySelector(".nav");
    const menuCloseItem = document.querySelector(".nav_close");
    burgerItem.addEventListener("click", () => {
        menu.classList.add("nav_active");
    });
    menuCloseItem.addEventListener("click", () => {
        menu.classList.remove("nav_active");
    });
}());

const selectBtnWrapper = document.querySelector('.contacts__select');
const selectBtn = selectBtnWrapper.querySelector('.city');
const options = document.querySelectorAll(".content__options_item");
const cityMenu = document.querySelector(".contacts__select_content");
const array = Array.from(options)

selectBtn.addEventListener("click", () => {
    selectBtnWrapper.classList.add("active");
});

const input = document.querySelector(".cityInput");

array.forEach(element => {
    element.addEventListener("click", (event) => {
        const target = event.target;
        input.value = target.innerText;
        selectBtnWrapper.classList.remove("active");
        const dataCity = target.dataset.city;
        addCard(dataCity);
    });
});

const cityData = {
    newYorkCity: {
        city: "New York City",
        phone: "+1 212 456 0002",
        addres: "9 East 91st Street",
    },
    sherrill: {
        city: "Sherrill, NY",
        phone: "+1 315 908 0004",
        addres: "14 WEST Noyes BLVD",
    },
    yonkers: {
        city: "Yonkers, NY",
        phone: "+1 914 678 0003",
        addres: "511 Warburton Ave",
    },
    canandaigua: {
        city: "Canandaigua, NY",
        phone: "+1 585 393 0001",
        addres: "151 Charlotte Street",
    },
}

function addCard(dataCity) {
    const card = document.querySelector(".card");
    const infoCity = document.getElementById("infoCity");
    const infoPhone = document.getElementById("infoPhone");
    const infoAddres = document.getElementById("infoAddres");
    const currentData = cityData[dataCity];
    infoCity.innerHTML = currentData.city;
    infoPhone.innerHTML = currentData.phone;
    infoAddres.innerHTML = currentData.addres;
    card.classList.remove("hide");
    selectBtn.addEventListener("click", () => {
        card.classList.add("hide");
    })
}

const priceImage = document.querySelectorAll(".priceImage");
const priceArray = Array.from(priceImage);


priceArray.forEach(element => {
    element.addEventListener("click", (event) => {
        const priceTarget = event.target;
        const dataPrice = priceTarget.dataset.price;
        const priceRatio = document.querySelector(".prices-ratio");
        addPrice(dataPrice);

        priceRatio.classList.add("hide");

    });
});


const priceData = {
    basics: {
        type: "Basics",
        price: "$15",
    },
    standard: {
        type: "Standard",
        price: "$25",
    },
    proCare: {
        type: "Pro Care",
        price: "$35",
    },
}

function addPrice(dataPrice) {
    const priceCard = document.querySelector(".accourdion");
    const priceType = document.getElementById("priceType");
    const priceParagraph = document.getElementById("priceParagraph");
    const currentDataPrice = priceData[dataPrice];
    priceType.innerHTML = currentDataPrice.type;
    priceParagraph.innerHTML = currentDataPrice.price;
    priceCard.classList.remove("hide");

    const dropdown = document.getElementById("dropdown");
    dropdown.addEventListener("click", () => {
        priceCard.classList.add("hide");

        const priceRatio = document.querySelector(".prices-ratio");
        priceRatio.classList.remove("hide");

    });
}

const buttonCard = document.querySelector(".buttonCard");

buttonCard.onclick = function () {
    window.location.href = "#contacts"
}

const serviceBtn = document.querySelectorAll(".serviceBtn");


function serviceScript() {
    const serviceBtns = Array.from(document.querySelectorAll(".serviceBtn"));
    const serviceItems = Array.from(document.querySelectorAll(".serviceContainer__item"));
    let activeTypes = [];

    serviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skipBlur();
            setActive(activeTypes, btn);

            if (activeTypes.length === 0) return;
            
            let blurItems = [...serviceItems];

            activeTypes.forEach(type => {
                blurItems = blurItems.filter(item => item.dataset.type !== type);
            })
        
            setBlur(blurItems);
        })
    })
}

function skipBlur() {
    const serviceItems = Array.from(document.querySelectorAll(".serviceContainer__item"));
    serviceItems.forEach(item => {
        item.classList.remove('blur');
    });
}

function setBlur(items) {
    items.forEach(item => item.classList.add('blur'));
}

function setActive(activeTypes, btn) {
    if (activeTypes.includes(btn.dataset.type)) {
        const index = activeTypes.findIndex(type => type === btn.dataset.type);
        activeTypes.splice(index, 1);
    } else {
        activeTypes.push(btn.dataset.type);
    }

    if (activeTypes.length === 3) activeTypes = [];
}


serviceScript();
