/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

         __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isWebp": () => (/* binding */ isWebp)
            /* harmony export */
         });
         // проверка поддержки webp, добавление класса webp или no-webp
         function isWebp() {
            //проверка поддержки webp
            function testWebP(callback) {

               var webP = new Image();
               webP.onload = webP.onerror = function () {
                  callback(webP.height == 2);
               };
               webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }

            //добавление класса
            testWebP(function (support) {
               if (support == true) {
                  document.querySelector('body').classList.add('webp');
               } else {
                  document.querySelector('body').classList.add('no-webp');
               }
            });
         }

         /***/
      })
/******/]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
         /******/
      }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
         /******/
      };
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
      /******/
   }
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
               /******/
            }
            /******/
         }
         /******/
      };
      /******/
   })();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
      /******/
   })();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
         }
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
         /******/
      };
      /******/
   })();
   /******/
   /************************************************************************/
   var __webpack_exports__ = {};
   // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
   (() => {
      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


      _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();


      //-------------------------------Прелоадер и плавное появление блоков---------------------------------
      if (document.readyState === "complete") {
         init();
      } else {
         window.addEventListener("load", init);
      }

      function init() {
         let preloader = document.querySelector('.preloader');
         let body = document.body;

         if (preloader) {
            body.classList.add('preloading');

            setTimeout(() => {
               preloader.classList.add('loaded');
               body.classList.remove('preloading');

               function onEntry(entry) {
                  entry.forEach(change => {
                     if (change.isIntersecting) {
                        change.target.classList.add('element-show');
                     }
                  });
               }

               let options = { threshold: [0.1] };
               let observer = new IntersectionObserver(onEntry, options);
               let elements = document.querySelectorAll('.element-animation');
               for (let elm of elements) {
                  observer.observe(elm);
               }
            }, 1200);
         }
      }

      //-----------------БУРГЕР МЕНЮ---------------------------
      let iconMenu = document.querySelector('.menu__icon');
      let menuBody = document.querySelector('.menu__body');

      if (iconMenu) {
         iconMenu.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');
         });
      }

      document.addEventListener('click', (event) => {
         if (!event.target.closest('.menu__body') && !event.target.closest('.menu__icon')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }
      });


      /*------------------------------Switch---------------------------*/
      const slider = document.querySelector('.slider');
      const normalRadio = document.getElementById('normal');
      const expertRadio = document.getElementById('expert');
      const labels = document.querySelectorAll('.header__switch label');

      if (slider && normalRadio && expertRadio && labels.length > 0) {
         let isDragging = false;
         let startX;
         let currentLeft;

         function updateValues() {
            const isMobile = window.matchMedia("(max-width: 820px)").matches;
            const maxLeft = isMobile ? 89 : 68;

            labels.forEach(label => {
               label.addEventListener('mousedown', (e) => {
                  isDragging = true;
                  startX = e.clientX;
                  currentLeft = parseInt(window.getComputedStyle(slider).left);
                  e.preventDefault();
               });

               document.addEventListener('mousemove', (e) => {
                  if (isDragging) {
                     const dx = e.clientX - startX;
                     let newLeft = currentLeft + dx;

                     if (newLeft < 2) newLeft = 2;
                     if (newLeft > maxLeft) newLeft = maxLeft;

                     slider.style.left = newLeft + 'px';
                  }
               });

               document.addEventListener('mouseup', () => {
                  if (isDragging) {
                     isDragging = false;

                     if (parseInt(slider.style.left) > (maxLeft / 2)) {
                        expertRadio.checked = true;
                        slider.style.left = maxLeft + 'px';
                        window.location.href = 'buy-crypto.html';
                     } else {
                        normalRadio.checked = true;
                        slider.style.left = '2px';
                        window.location.href = 'index.html';
                     }
                  }
               });

               label.addEventListener('click', (e) => {
                  if (e.target.getAttribute('for') === 'normal') {
                     slider.style.left = '2px';
                     window.location.href = 'index.html';
                  } else {
                     slider.style.left = maxLeft + 'px';
                     window.location.href = 'buy-crypto.html';
                  }
               });
            });
         }

         updateValues();
         window.addEventListener('resize', updateValues);
      }


      /*------------------------------Перенос контента---------------------------*/
      function moveElements() {
         const switchElement = document.querySelector('.header__switch');
         const buttonElement = document.querySelector('.header__button');
         const menuBody = document.querySelector('.menu__body');
         const headerInfo = document.querySelector('.header__info');

         if (switchElement && buttonElement && menuBody) {
            if (window.innerWidth <= 620) {
               if (!menuBody.contains(switchElement)) {
                  menuBody.appendChild(switchElement);
               }
               if (!menuBody.contains(buttonElement)) {
                  menuBody.appendChild(buttonElement);
               }
            } else {
               if (headerInfo) {
                  if (!headerInfo.contains(switchElement)) {
                     headerInfo.appendChild(switchElement);
                  }
                  if (!headerInfo.contains(buttonElement)) {
                     headerInfo.appendChild(buttonElement);
                  }
               }
            }
         }
      }

      window.addEventListener('load', moveElements);
      window.addEventListener('resize', moveElements);


      /*------------------------------Кастомный Dropdown---------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         // Обработка для hero__buy-item
         document.querySelectorAll('.hero__buy-item').forEach(function (item) {
            const dropDownWrapper = item.querySelector('.dropdown, .s-dropdown');

            if (!dropDownWrapper) return;

            const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
            const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
            const dropDownListItems = dropDownList ? dropDownList.querySelectorAll('.dropdown__list-item') : [];
            const hiddenInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

            if (!dropDownBtn || !dropDownList) return;

            dropDownBtn.addEventListener('click', function (e) {
               document.querySelectorAll('.hero__buy-item').forEach(function (otherItem) {
                  if (otherItem !== item) {
                     otherItem.classList.remove('active');
                     const otherDropDown = otherItem.querySelector('.dropdown__list');
                     if (otherDropDown) {
                        otherDropDown.classList.remove('dropdown__list--visible');
                     }
                  }
               });

               dropDownList.classList.toggle('dropdown__list--visible');
               dropDownBtn.classList.toggle('dropdown__button--active');

               if (dropDownList.classList.contains('dropdown__list--visible')) {
                  item.classList.add('active');
               } else {
                  item.classList.remove('active');
               }
            });

            dropDownListItems.forEach(function (listItem) {
               listItem.addEventListener('click', function (e) {
                  e.stopPropagation();

                  dropDownListItems.forEach(function (li) {
                     li.classList.remove('active');
                  });

                  listItem.classList.add('active');

                  const span = listItem.querySelector('span');
                  let currency;
                  if (span) {
                     currency = listItem.textContent.replace(span.textContent, '').trim();
                  } else {
                     currency = listItem.textContent.trim();
                  }

                  dropDownBtn.innerHTML = listItem.querySelector('img').outerHTML + ' ' + currency;
                  hiddenInput.value = currency;

                  dropDownBtn.focus();
                  dropDownList.classList.remove('dropdown__list--visible');
                  dropDownBtn.classList.remove('dropdown__button--active');
                  item.classList.remove('active');
               });
            });

            document.addEventListener('click', function (e) {
               if (!item.contains(e.target)) {
                  dropDownBtn.classList.remove('dropdown__button--active');
                  dropDownList.classList.remove('dropdown__list--visible');
                  item.classList.remove('active');
               }
            });

            document.addEventListener('keydown', function (e) {
               if (e.key === 'Tab' || e.key === 'Escape') {
                  dropDownBtn.classList.remove('dropdown__button--active');
                  dropDownList.classList.remove('dropdown__list--visible');
                  item.classList.remove('active');
               }
            });
         });

         // Обработка для step__value
         document.querySelectorAll('.step__value').forEach(function (item) {
            const dropDownWrapper = item.querySelector('.dropdown, .s-dropdown');

            if (!dropDownWrapper) return;

            const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
            const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
            const dropDownListItems = dropDownList ? dropDownList.querySelectorAll('.dropdown__list-item') : [];
            const hiddenInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

            if (!dropDownBtn || !dropDownList) return;

            dropDownBtn.addEventListener('click', function (e) {
               document.querySelectorAll('.step__value').forEach(function (otherItem) {
                  if (otherItem !== item) {
                     otherItem.classList.remove('active');
                     const otherDropDown = otherItem.querySelector('.dropdown__list');
                     if (otherDropDown) {
                        otherDropDown.classList.remove('dropdown__list--visible');
                     }
                  }
               });

               dropDownList.classList.toggle('dropdown__list--visible');
               dropDownBtn.classList.toggle('dropdown__button--active');

               if (dropDownList.classList.contains('dropdown__list--visible')) {
                  item.classList.add('active');
               } else {
                  item.classList.remove('active');
               }
            });

            dropDownListItems.forEach(function (listItem) {
               listItem.addEventListener('click', function (e) {
                  e.stopPropagation();

                  dropDownListItems.forEach(function (li) {
                     li.classList.remove('active');
                  });

                  listItem.classList.add('active');

                  const span = listItem.querySelector('span');
                  let currency;
                  if (span) {
                     currency = listItem.textContent.replace(span.textContent, '').trim();
                  } else {
                     currency = listItem.textContent.trim();
                  }

                  dropDownBtn.innerHTML = listItem.querySelector('img').outerHTML + ' ' + currency;
                  hiddenInput.value = currency;

                  dropDownBtn.focus();
                  dropDownList.classList.remove('dropdown__list--visible');
                  dropDownBtn.classList.remove('dropdown__button--active');
                  item.classList.remove('active');
               });
            });

            document.addEventListener('click', function (e) {
               if (!item.contains(e.target)) {
                  dropDownBtn.classList.remove('dropdown__button--active');
                  dropDownList.classList.remove('dropdown__list--visible');
                  item.classList.remove('active');
               }
            });

            document.addEventListener('keydown', function (e) {
               if (e.key === 'Tab' || e.key === 'Escape') {
                  dropDownBtn.classList.remove('dropdown__button--active');
                  dropDownList.classList.remove('dropdown__list--visible');
                  item.classList.remove('active');
               }
            });
         });
      });

      /*------------------------------Карусель---------------------------*/
      const carouselTrack = document.querySelector('.carousel-track');
      if (carouselTrack) {
         const duplicateItems = () => {
            const items = Array.from(carouselTrack.children);
            items.forEach(item => {
               const clone = item.cloneNode(true);
               carouselTrack.appendChild(clone);
            });
         };
         duplicateItems();
         duplicateItems();
      }

      /*------------------------------Partners slider---------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         const sliderElement = document.querySelector('.partners__slider');

         if (sliderElement) {
            var swiper = new Swiper(sliderElement, {
               slidesPerView: 'auto',
               loop: true,
               spaceBetween: 30,
               freeMode: false,
               watchSlidesVisibility: true,
               watchSlidesProgress: true,
               speed: 800,
               grabCursor: true,
               autoplay: {
                  delay: 1000,
                  stopOnLastSlide: false,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: false,
               },
               breakpoints: {
                  320: {
                     spaceBetween: 16,
                  },
                  431: {
                     spaceBetween: 30,
                  },
               }
            });
         }
      });


      /*------------------------------FAQ---------------------------*/
      const instructionsItems = document.querySelectorAll('.instructions__item');
      if (instructionsItems.length > 0) {
         instructionsItems.forEach(item => {
            const instructionsText = item.querySelector('.instructions__text');
            if (instructionsText) {
               instructionsText.addEventListener('click', function () {
                  item.classList.toggle('opened');
               });
            }
         });
      }

      /*------------------------------faq---------------------------*/
      const faqItems = document.querySelectorAll('.faq__item');
      if (faqItems.length > 0) {
         faqItems.forEach(item => {
            const faqQuestion = item.querySelector('.faq__question');
            if (faqQuestion) {
               faqQuestion.addEventListener('click', function () {
                  item.classList.toggle('opened');
               });
            }
         });
      }


      /*------------------------------Signup---------------------------*/
      const signupButtons = document.querySelectorAll('.signup-button');
      const signupElement = document.querySelector('.signup');
      const signupCloseButton = document.querySelector('.signup__close');
      const signupBody = document.querySelector('.signup__body');

      if (signupButtons.length > 0 && signupElement && signupCloseButton && signupBody) {
         signupButtons.forEach(button => {
            button.addEventListener('click', () => {
               signupElement.classList.add('opened');
            });
         });

         signupCloseButton.addEventListener('click', () => {
            signupElement.classList.remove('opened');
         });

         document.addEventListener('click', (e) => {
            if (!signupBody.contains(e.target) && !e.target.closest('.signup-button')) {
               signupElement.classList.remove('opened');
            }
         });
      }

      /*------------------------------ОТправка формы---------------------------*/
      document.querySelector('.signup__form').addEventListener('submit', function (e) {
         e.preventDefault();
         const signupBody = document.querySelector('.signup__body');
         signupBody.classList.add('loading');
         setTimeout(() => {
            signupBody.classList.remove('loading');
            signupBody.classList.add('loaded');
            setTimeout(() => {
               signupBody.classList.remove('loaded');
            }, 3000);
         }, 3000);
      });

      /*------------------------------BUY CRYPTO---------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         // Disabled
         const spendAmountInput = document.getElementById('spendAmound');
         const buyBody = document.querySelector('.buy__body');
         const policyCheckbox = document.getElementById('policyAgree');
         const submitButton = document.querySelector('.submit-button');

         if (spendAmountInput && buyBody && policyCheckbox && submitButton) {
            function updateStates() {
               buyBody.classList.toggle('disabled-step', spendAmountInput.value.trim() === '');
               submitButton.classList.toggle('disabled', !policyCheckbox.checked);
            }

            spendAmountInput.addEventListener('input', updateStates);
            policyCheckbox.addEventListener('change', updateStates);
            updateStates();
         }

         // Only number input
         const numberInputs = document.querySelectorAll('.number-input');
         if (numberInputs.length > 0) {
            numberInputs.forEach(input => {
               input.addEventListener('input', function () {
                  this.value = this.value.replace(/[^0-9.]/g, '').replace(/\.(?=.*\.)/g, '');
               });
            });
         }

         // Card number input
         const cardInput = document.querySelector('.card-input');
         if (cardInput) {
            cardInput.addEventListener('input', function (e) {
               let value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
               const cardInputIcon = document.querySelector('.card-input-icon');
               e.target.value = value;

               if (value.length === 19) {
                  cardInputIcon.style.opacity = '1';
               } else {
                  cardInputIcon.style.opacity = '0';
               }
            });

            cardInput.addEventListener('blur', function () {
               const value = this.value.replace(/\s+/g, '');
               const isComplete = value.length === 16;
               const isValid = /^(\d{4} \d{4} \d{4} \d{4})$/.test(this.value);
               this.closest('.step__value').classList.toggle('error', !isComplete || !isValid);
            });
         }

         // Card date input
         const dateInput = document.querySelector('.date-input');
         if (dateInput) {
            dateInput.addEventListener('input', function (e) {
               let value = e.target.value.replace(/\D/g, '');
               if (value.length > 2) {
                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
               }
               e.target.value = value;
            });

            dateInput.addEventListener('blur', function () {
               const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.value);
               this.closest('.step__value').classList.toggle('error', !isValid);
            });
         }

         // CVV input
         const cvvInput = document.querySelector('.cvv-input');
         if (cvvInput) {
            cvvInput.addEventListener('input', function (e) {
               this.value = e.target.value.replace(/\D/g, '');
            });

            cvvInput.addEventListener('blur', function () {
               const isValid = /^\d{3,4}$/.test(this.value);
               this.closest('.step__value').classList.toggle('error', this.value.length < 3 || !isValid);
            });
         }
      });



      /*---------------------------blockchain active------------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         const items = document.querySelectorAll('.blockchain__item');

         items.forEach(item => {
            item.addEventListener('click', function () {
               items.forEach(el => el.classList.remove('active'));
               this.classList.add('active');
            });
         });
      });


      /*------------------------------Анимация плашки---------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         const items = document.querySelectorAll('.blockchain__item');
         const bgCover = document.querySelector('.bg-cover');

         items.forEach(item => {
            item.addEventListener('click', function () {
               items.forEach(el => el.classList.remove('active'));

               this.classList.add('active');

               const { offsetLeft, offsetWidth } = this;
               bgCover.style.transform = `translateX(${offsetLeft}px)`;
               bgCover.style.width = `${offsetWidth}px`;
            });
         });

         const activeItem = document.querySelector('.blockchain__item.active');
         if (activeItem) {
            const { offsetLeft, offsetWidth } = activeItem;
            bgCover.style.transform = `translateX(${offsetLeft}px)`;
            bgCover.style.width = `${offsetWidth}px`;
         }
      });

      document.addEventListener('DOMContentLoaded', function () {
         const userIdInput = document.getElementById('userId');

         if (userIdInput) {
            userIdInput.addEventListener('input', function () {
               this.value = this.value.replace(/\D/g, '');

               if (this.value.length > 10) {
                  this.value = this.value.slice(0, 10);
               }
            });
         }
      });



   })();

   /******/
})()
   ;