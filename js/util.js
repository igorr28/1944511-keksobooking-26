import { advertisements } from './data.js';

const ALERT_SHOW_TIME = 5000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
console.log(successTemplate);

/** Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param {number} a — первое число
 * @param {number} b — второе число
 * @return {number} — случайное целое число
 */
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

/** Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
 * @param {number} a — первое число
 * @param {number} b — второе число
 * @param {number} digits — количество знаков после запятой
 * @return {number} — случайное число с плавающей точкой
 */
function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

/**  Функция, возвращающая случайный элемент из массива
 * @param {array} elements — массив для выбора случайного элемента
 * @return {string} — случайный элемент массива
 */
function getRandomArrayElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

/**  Функция, возвращающая адрес изображения свойства аватар
 * @param {number} amount — общее количество элементов
 * @return {string} — строка - адрес изображения
 */
function createImageAdress(amount) {
  let imageNumber = getRandomPositiveInteger(1, amount);
  let strImageAdress = (imageNumber < 10) ? `img/avatars/user0${imageNumber}.png` : `img/avatars/user${imageNumber}.png`;

  for (let i = 0; i < advertisements.length; i++) {
    if (advertisements[i].author.avatar === strImageAdress) {
      imageNumber = getRandomPositiveInteger(1, amount);
      strImageAdress = (imageNumber < 10) ? `img/avatars/user0${imageNumber}.png` : `img/avatars/user${imageNumber}.png`;
      i = -1;
    }
  }
  return strImageAdress;
}

/**  Массив случайной длины из переданного массива значений
 * @param {array} array — исходный массив значений
 * @return {array} — массив случайной длины
 */
function createRandomArray(array) {
  if (array !== undefined) {
    const randomArray = [];
    const randomNumber = getRandomPositiveInteger(1, array.length);
    for (let i = 0; i <= randomNumber; i++) {
      const randomArrayElement = getRandomArrayElement(array);
      if (!randomArray.includes(randomArrayElement)) {
        randomArray.push(randomArrayElement);
      }
    }
    return randomArray;
  } else {
    return undefined;
  }
}

/**  Функция, проверяет пустое ли свойство объекта
 * @param property — свойство объекта
 * @return {boolean} — true or false
 */
function isEmptyProperty (property) {
  return property === undefined;
}

/**  Функция, проверяет на число*/
function isNumeric(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function showSuccessMessage () {
  const successItem = successTemplate.cloneNode(true);
  document.body.appendChild(successItem);
  setTimeout(() => {
    successItem.remove();
  }, ALERT_SHOW_TIME);
}

export { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, createImageAdress, createRandomArray, isEmptyProperty, isNumeric, showAlert, showSuccessMessage };
