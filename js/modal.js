import { loadingModalData, updatesCounterCommentsShown } from './loading-modal-data.js';
import { isEscapeKey } from './util.js';

const bodyScroll = document.querySelector('body');
const rootModalElement = document.querySelector('.big-picture');
const modalOpenElement = document.querySelector('.pictures');
const modalCloseElement = rootModalElement.querySelector('.big-picture__cancel');
const commentsLoaderElement = rootModalElement.querySelector('.comments-loader');
const NUMBER_LOAD_COMMENTS = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal(); // eslint-disable-line
  }
};

const showComments = () => {
  const hiddenСommentElements = document.querySelectorAll('.social__comment.hidden');

  if (hiddenСommentElements.length >= NUMBER_LOAD_COMMENTS) {
    for (let i = 0; i <= NUMBER_LOAD_COMMENTS - 1; i++) {
      hiddenСommentElements[i].classList.remove('hidden');
    }
  } else if (hiddenСommentElements.length >= 0) {
    hiddenСommentElements.forEach((item) => {
      item.classList.remove('hidden');
    });
    commentsLoaderElement.classList.add('hidden');
  }

  updatesCounterCommentsShown();
};

const closeModal = () => {
  bodyScroll.classList.remove('modal-open');
  rootModalElement.classList.add('hidden');
  modalCloseElement.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', showComments);
};

const openModal = () => {
  bodyScroll.classList.add('modal-open');
  rootModalElement.classList.remove('hidden');
  modalCloseElement.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
  updatesCounterCommentsShown();
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.addEventListener('click', showComments);
};

const initializeModal = () => {
  modalOpenElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.matches('a .picture__img')) {
      loadingModalData(evt);
      openModal();
    }
  });
};

export { initializeModal };
