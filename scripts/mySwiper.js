const slider = document.querySelector('.slider');
const sliderCounter = document.querySelector('.slider__counter ');

const slides = document.querySelectorAll('.slider__slide');
const btnLeft = document.querySelector('.slider__btn_previos');
const btnRight = document.querySelector('.slider__btn_next');

btnLeft.setAttribute("disabled", "disabled");

function checkWindow() {
  const windowWidth = window.innerWidth;
  if (windowWidth > 1274) {
    slider.dataset.items = 3;
    return 3;
  } else {
    if (windowWidth > 600) {
      slider.dataset.items = 2;
      return 2;
    } else {
      slider.dataset.items = 1;
      return 1;
    }
  }
}


const ANIMATION_DURATION = 400;
const allSlides = slides.length;
let countItemsPage = checkWindow();
let lastPage = Math.floor(allSlides / countItemsPage);

function renderSlides() {
  countItemsPage = checkWindow();
  lastPage = Math.floor(allSlides / countItemsPage);

  for (let i = 0; i < allSlides; i++) {
    slides[i].classList.add(`slider__slide_${i + 1}`);
    slides[i].classList.remove('slide-hide');
    slides[i].classList.remove('slide-off');
    slides[i].classList.remove('slide-on');
  }
  for (let i = countItemsPage; i < allSlides; i++) {
    slides[i].classList.add('slide-hide');
  }
}

function closePage(page) {
  for (let i = 0; i < countItemsPage; i++) {
    slides[i + page * countItemsPage].classList.remove('slide-on');
    slides[i + page * countItemsPage].classList.add('slide-off');

    const timeout = setTimeout(() => {
      slides[i + page * countItemsPage].classList.add('slide-hide');
      clearTimeout(timeout);
    }, ANIMATION_DURATION - 100);
  }
}

function openPage(page) {
  for (let i = 0; i < countItemsPage; i++) {
    slides[i + page * countItemsPage].classList.remove('slide-off');
    slides[i + page * countItemsPage].classList.add('slide-on');
    const timeout = setTimeout(() => {
      slides[i + page * countItemsPage].classList.remove('slide-hide');
      clearTimeout(timeout);
    }, ANIMATION_DURATION);
  }
}

renderSlides();
let page = 0;
sliderCounter.textContent = `${page + 1} / ${lastPage}`;
btnRight.addEventListener('click', () => {
  if (page < lastPage - 1) {
    closePage(page);
    page++;
    openPage(page);
    sliderCounter.textContent = `${page + 1} / ${lastPage}`;
  }
  btnLeft.removeAttribute("disabled");
  if (page + 1 === lastPage) {
    btnRight.setAttribute("disabled", "disabled");
  }
})

btnLeft.addEventListener('click', () => {
  if (page > 0) {
    closePage(page);
    page--;
    openPage(page);
    sliderCounter.textContent = `${page + 1} / ${lastPage}`;
  }
  btnRight.removeAttribute("disabled");
  if (page === 0) {
    btnLeft.setAttribute("disabled", "disabled");
  }
})

window.addEventListener('resize', () => {
  checkWindow();
  renderSlides();
  page = 0
  sliderCounter.textContent = `${page + 1} / ${lastPage}`;
})