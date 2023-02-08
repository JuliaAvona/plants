let myScore = 'Самооценка 125/125 \n\n [+] При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50 \n [+] Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50 \n [+] В разделе contacts реализован select с выбором городов +25';
console.log(myScore);

// Humburger - menu - const
const humb = document.querySelector('.hamb__field');
const popup = document.querySelector('.popup');
const navbar = document.querySelector('.nav__items').cloneNode(1);
const body = document.body;

//Blur Section - const
const allServiceButtons = document.querySelectorAll('.service__button');
const gardensButton = document.querySelector('.gardens_button');
const lawnButton = document.querySelector('.lawn_button');
const plantingButton = document.querySelector('.planting_button');

const allCards = document.querySelectorAll('.service__one__card'); // all Cards
const gardensCards = document.querySelectorAll('.gardens_card'); // Gardens Cards
const plantingCards = document.querySelectorAll('.planting_card'); // Planting Cards
const lawnCards = document.querySelectorAll('.lawn_card'); // Lawn Cards

//Accordeon Section - const
const allAccordeon = document.querySelectorAll('.prices__accordion');
const allPricesCard = document.querySelectorAll('.prices__item');
const allPricesIcon = document.querySelectorAll('.prices__icon');
const allPricesButton = document.querySelectorAll('.prices__button');

//City Section - const
const contactsCityButton = document.querySelector('.contacts__city');
const allCityList = document.querySelector('.city__accordeon');
const contactsIcon = document.querySelector('.contacts__icon');
const textCity = document.querySelector('.contacts__text');
const cityLinks = document.querySelectorAll('.city-link');
const allCardsWithCitys = document.querySelectorAll('.city-phone_card');


// Humburger - menu
humb.addEventListener('click', humbHandler);   // Pop-up service
navbar.addEventListener('click', hiddenPopup); // Hidden popup after click


function humbHandler(event) {
  event.preventDefault();
  // change style for click
  popup.classList.toggle('open');
  humb.classList.toggle('active');
  body.classList.toggle('noscroll');
  renderPopUp();
}

function renderPopUp() {
    popup.appendChild(navbar);
}

function hiddenPopup() {
  popup.classList.remove('open');
  humb.classList.remove('active');
}

//The menu is hidden if you click outside the given window
document.addEventListener('DOMContentLoaded', () => { 
  window.addEventListener('click', e => {
    const target = e.target;
    if (!target.closest('.nav__items') && !target.closest('.hamb__field')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
      hiddenPopup();
    }
  });
});

//Blur Section
gardensButton.addEventListener('click', () => blurGardensCards(gardensButton,'gardens_card'));
plantingButton.addEventListener('click', () => blurGardensCards(plantingButton,'planting_card'));
lawnButton.addEventListener('click', () => blurGardensCards(lawnButton,'lawn_card'));

function blurGardensCards(nameButton, nameClass) {
  nameButton.classList.toggle('orange');
  checkButtons();

  let count = 0;
  for (let allServiceButton of allServiceButtons) {
    if (allServiceButton.classList.contains('orange')) {
      count++;
    }
  }

  //TURN OFF BUTTON
  if (!nameButton.classList.contains('orange')) {
    if (count == 0) {
      for (let allCard of allCards) {
        allCard.classList.remove('blur');
      }
    } else {
      for (let allCard of allCards) {
        if (allCard.classList.contains(nameClass)) {
          allCard.classList.add('blur');
        }
      }
    }
  } else {  //TURN ON BUTTON
    for (let allCard of allCards) {
      if (count === 1) {
        if (!allCard.classList.contains(nameClass)) {
          allCard.classList.toggle('blur');
        }
      } else if (count === 2) {
        if (allCard.classList.contains(nameClass)) {
          allCard.classList.remove('blur');
        }
      }
    }
  }
} 

function checkButtons() {
  let count = 0;
  for (let allServiceButton of allServiceButtons) {
    if (allServiceButton.classList.contains('orange')) {
      count++;
    }
  }
  if (count >= 2) {
    for (let allServiceButton of allServiceButtons) {
      if (!allServiceButton.classList.contains('orange')) {
        allServiceButton.classList.add('blur');
        allServiceButton.disabled = true;
      }
    }
  } else { 
    for (let allServiceButton of allServiceButtons) {
      allServiceButton.classList.remove('blur');
      allServiceButton.disabled = false;
    }
  }
}

//Accordeon Section
allPricesButton.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (!allAccordeon[i].classList.contains("open")) {
      allAccordeon[i].classList.add("open");
      allPricesCard[i].style.backgroundColor = "#d6e7d2";
      allPricesIcon[i].src = "./assets/img/price_btn-2.png";
    } else {
      hiddenCityCard(i);
    }

    for (let j = 0; j < allPricesButton.length; j++) {
      if (i != j) {
        hiddenCityCard(j);
      }
    }
  });
});

function hiddenCityCard(index) {
  allAccordeon[index].classList.remove("open");
  allPricesCard[index].style.backgroundColor = "#edf2ec";
  allPricesIcon[index].src = "./assets/img/price_btn.png";
}

//City Section
contactsCityButton.addEventListener('click', () => toggleCityInfo());

function toggleCityInfo() {
  if (!allCityList.classList.contains('open')) {
    allCityList.classList.add('open');
    closeAllCards();
    textCity.textContent = 'City';
    contactsCityButton.style.backgroundColor = '#c1e698';
    contactsCityButton.style.boxShadow = 'none';
    contactsIcon.src = './assets/img/contact_btn-2.png';
  } else {
    allCityList.classList.remove('open');
    contactsCityButton.style.backgroundColor = '#d6e7d2';
    contactsCityButton.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    contactsIcon.src = './assets/img/contact_btn.png';
  }
}

function closeAllCards() {
  allCardsWithCitys.forEach((card) => {
    card.classList.add('close');
  });
}

cityLinks.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    toggleCityInfo();
    allCardsWithCitys[i].classList.remove('close');
    textCity.textContent = btn.textContent;
  });
});

//The Citys cards is hidden if you click outside the given window
document.addEventListener('DOMContentLoaded', () => { 
  window.addEventListener('click', e => {
    const target = e.target;
    if (!target.closest('.items__city-links')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
      closeAllCards();
      textCity.textContent = 'City';
    }
  });
});
