document.addEventListener('DOMContentLoaded', () => {
  //////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// libraries init ////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  document.querySelectorAll('.dropdown__content').forEach(element => {
    new SimpleBar(element, {
      scrollbarMaxSize: 24,
      autoHide: false,
    });
  });

  const swipers = document.querySelectorAll('.swiper');
  new Swiper(swipers[0], {
    direction: 'horizontal',
    loop: true,
    speed: 2000,

    autoplay: {
      delay: 2000,
    },
  });

  new Swiper(swipers[1], {
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    breakpoints: {
      1600: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 27,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
    },
  });

  new Swiper(swipers[2], {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 50,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3,
    breakpoints: {
      1600: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
    },
  });

  const galleruChoices = document.querySelector('.choices');
  const choices = new Choices(galleruChoices, {
    searchEnabled: false,
    searchChoices: false,
    renderChoiceLimit: 3,
  });

  const ac = new Accordion('.epoch', {
    duration: 300,
  });
  ac.open(0);

  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// dropdown window //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  const artBtn = document.querySelectorAll('.art-trends__link');
  const dropdownList = document.querySelectorAll('.dropdown__content');
  const dropdownScroll = document.querySelectorAll('.simplebar-vertical');
  const artBtnArrow = document.querySelectorAll('.art-trends__arrow');

  function hideDropdown(hide_el) {
    let interval = setTimeout(() => {
      hide_el.classList.add('dropdown__content_hide');
      clearTimeout(interval);
    }, 300);
  }

  function closeAllDropdown(openIndex) {
    for (let i = 0; i < openIndex; i++) {
      dropdownList[i].classList.remove('dropdown__content_open');
      dropdownScroll[i].classList.remove('simplebar-vertical_open');
      artBtnArrow[i].classList.remove('art-trends__arrow_open');
      hideDropdown(dropdownList[i]);
    }
    for (let i = openIndex + 1; i < artBtn.length; i++) {
      dropdownList[i].classList.remove('dropdown__content_open');
      dropdownScroll[i].classList.remove('simplebar-vertical_open');
      artBtnArrow[i].classList.remove('art-trends__arrow_open');
      hideDropdown(dropdownList[i]);
    }
  }

  closeAllDropdown(artBtn.length);

  for (let i = 0; i < artBtn.length; i++) {
    artBtn[i].addEventListener('click', () => {
      if (dropdownList[i].classList.value.includes('dropdown__content_hide')) {
        dropdownList[i].classList.remove('dropdown__content_hide');
      } else {
        hideDropdown(dropdownList[i]);
      }
      closeAllDropdown(i);
      let interval = setTimeout(() => {
        dropdownList[i].classList.toggle('dropdown__content_open');
        dropdownScroll[i].classList.toggle('simplebar-vertical_open');
        artBtnArrow[i].classList.toggle('art-trends__arrow_open');
        clearTimeout(interval);
      }, 10);
    })
    // Закрытие по кнопке escape
    artBtn[i].addEventListener('keydown', element => {
      if (element.key === 'Escape') {
        closeAllDropdown(artBtn.length);
      }
    })
  }

  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// modal window /////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  const modalCloseBtn = document.querySelectorAll('.modal__close-btn');
  const modal = document.querySelector('.modal');
  const modalItem = document.querySelectorAll('.modal__item');
  const slides = document.querySelectorAll('.slider__slide');

  // скрываем всё при первом запуске
  modalItem.forEach(element => {
    element.classList.add('modal__item_hide');
    element.classList.add('modal__item_off');
  })
  modal.classList.add('modal_hide');
  modal.classList.add('modal_off');

  // функция плавного закрытия модальног окна
  function closeModal() {
    document.body.parentNode.classList.remove('stop-scroll');
    modal.classList.add('modal_off');
    modalItem.forEach(element => {
      element.classList.add('modal__item_off');
    })
    const timer = setTimeout(() => {
      modal.classList.add('modal_hide');
      modalItem.forEach(element => {
        element.classList.add('modal__item_hide');
      })
      clearTimeout(timer);
    }, 300);
  }

  // закрытие по нажатию кнопки
  modalCloseBtn.forEach(element => {
    element.addEventListener('click', () => {
      closeModal();
    })
  });

  // закрытие по нажатию области
  modal.addEventListener('click', () => {
    flag = true;
    closeModal();
  });

  // закрытие по нажатию клавиши
  document.addEventListener('keydown', element => {
    if (element.key === 'Escape') {
      closeModal();
    }
  });

  // Открытие соответсвующего модального окна
  for (let i = 0; i < slides.length; i++) {
    slides[i].addEventListener('click', () => {
      document.body.parentNode.classList.add('stop-scroll');
      modalItem[i].classList.remove('modal__item_hide');
      modal.classList.remove('modal_hide');
      const timer = setTimeout(() => {
        modalItem[i].classList.remove('modal__item_off');
        modal.classList.remove('modal_off');
        clearTimeout(timer);
      }, 10);
    })
  }

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////// catalog's events  //////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  const authorsBtn = document.querySelectorAll('.catalog__btn');
  const authorShow = document.querySelectorAll('.catalog__show');
  const authorShowEmpty = document.querySelector('.catalog__show_empty');

  for (let i = 0; i < authorsBtn.length; i++) {
    authorsBtn[i].addEventListener('click', () => {
      // Снимаем со всех кнопок disabled и ставим на ту, на которую нажали
      authorsBtn.forEach(element => {
        element.removeAttribute('disabled');
      });
      authorsBtn[i].setAttribute('disabled', 'disabled');
      // Плавно скрываем все элементы, те, которых нет, скрываться и не будут
      authorShow.forEach(element => {
        element.classList.add('catalog__show_off');
      });
      // Отыскиваем нужный элемент разметки с описанием автора
      const author = document.getElementById(`author-${i}`);
      // С задержкой убираем этот элемент из потока
      const timeout = setTimeout(() => {
        authorShow.forEach(element => {
          element.classList.add('catalog__show_hide');
        });
        // Проверяем, есть ли вообще такой автор, если нет, то вставляем пустышку
        if (author === null) {
          authorShowEmpty.classList.remove('catalog__show_hide');
        } else {
          author.classList.remove('catalog__show_hide');
        }
        // и снова задержка небольшая для плавнеости отображения
        const timeoutInner = setTimeout(() => {
          if (author === null) {
            authorShowEmpty.classList.remove('catalog__show_off');
          } else {
            author.classList.remove('catalog__show_off');
          }
          clearTimeout(timeoutInner);
        }, 10)
        clearTimeout(timeout);
      }, 300);
    })
  }

  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// form checking ////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  const btnForm = document.querySelector('.callback__form-btn');
  const errorMassage = document.querySelectorAll('.callback__form-error');
  const inputForm = document.querySelectorAll('.callback__form-input');

  // спрячем сообщения об ошибке
  errorMassage.forEach(element => {
    element.classList.add('callback__form-error_hide');
  });

  btnForm.addEventListener('click', el => {
    let checkName = true;

    // Проверка, чтобы минимум 2 буквы было в имени
    const normalizeName = inputForm[0].value.trim();
    if (normalizeName.length < 2) {
      mistakes = false;
      errorMassage[0].classList.remove('callback__form-error_hide');
      inputForm[0].classList.add('callback__form-input_error');
    } else {
      errorMassage[0].classList.add('callback__form-error_hide');
      inputForm[0].classList.remove('callback__form-input_error');
    }

    // проверка вхождения в телефон только числовых значений и длины
    const normalizePhoneNumber = inputForm[1].value.trim().split('');
    const alphabetNumber = '0123456789';

    let checkPhone = true;
    normalizePhoneNumber.forEach(element => {
      checkPhone = checkPhone && alphabetNumber.includes(element);
    });

    checkPhone = normalizePhoneNumber.length > 10 && checkPhone ? true : false;

    if (checkPhone) {
      errorMassage[1].classList.add('callback__form-error_hide');
      inputForm[1].classList.remove('callback__form-input_error');
    } else {
      errorMassage[1].classList.remove('callback__form-error_hide');
      inputForm[1].classList.add('callback__form-input_error');
    }

    if (!(checkName && checkPhone)) {
      el.preventDefault();
    } else {
      inputForm.submit();
    }
  })


  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// yandex map ///////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  ymaps.ready(init);
  function init() {
    let myMap = new ymaps.Map("map", {
      center: [55.76027392, 37.61464719],
      zoom: 14,
    });

    let myPlacemark = new ymaps.Placemark([55.76027392, 37.61464719], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/location.svg',
      iconImageSize: [20, 20],
      // iconImageOffset: [-3, -42]
    });

    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myPlacemark);
  }

  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// burger menu //////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const loginBtn = document.querySelector('.header__login');
  const navLinks = document.querySelectorAll('.nav-list__link');

  function switchBurger() {
    burger.classList.toggle('burger_close');
    menu.classList.toggle('menu_open');
    document.body.parentNode.classList.toggle('stop-scroll');
    document.body.classList.toggle('stop-scroll');
  }

  burger.addEventListener('click', () => {
    switchBurger()
  })

  navLinks.forEach(element => {
    element.addEventListener('click', () => {
      switchBurger()
    })
  });

  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// search btn ///////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  const searchBtn = document.querySelector('.search-btn');
  const search = document.querySelector('.search');

  searchBtn.addEventListener('click', () => {
    search.classList.toggle('search_open');
    searchBtn.classList.toggle('search-btn_close');
  })

  // Меняем содержимое кнопки при мобильной вресии
  const callbackBtn = document.querySelector('.callback__form-btn');
  if (window.innerWidth <= 768) {
    callbackBtn.textContent = 'Заказать';
  }

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////  tooltips  ///////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  const tooltip = document.querySelectorAll('.projects__tooltip');
  const tooltipContent = document.querySelectorAll('.projects__tooltip-content');
  const TOOLTIP_WIDTH = 264;

  // Перерасчёт расположения, чтобы не выползал тултип за область видимости на любом разрешении
  function recuclTooltips() {
    for (let i = 0; i < tooltip.length; i++) {
      let distanceLeft = tooltip[i].getBoundingClientRect().x;
      let distanceRight = window.innerWidth - distanceLeft;
      if (distanceRight < TOOLTIP_WIDTH) {
        tooltipContent[i].style.left = `-${TOOLTIP_WIDTH - distanceRight + 15}px`;
      } else {
        if (distanceLeft < TOOLTIP_WIDTH / 2) {
          tooltipContent[i].style.left = `0px`;
        } else {
          tooltipContent[i].style.left = `-119px`;
        }
      }
      tooltipContent[i].style.width = "264px";
    };
  }
  recuclTooltips();

  window.addEventListener('resize', () => {
    recuclTooltips();
  })
})