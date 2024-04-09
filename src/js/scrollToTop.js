import throttle from 'lodash.throttle';

export const refs = {
  scrollToTopEl: document.querySelector('.scroll-to-top'),
};

refs.scrollToTopEl.addEventListener('click', OnScrollElToTopClick);
window.addEventListener('scroll', throttle(onWindowScroll, 300));

function OnScrollElToTopClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function onWindowScroll() {
  if (window.scrollY > 100) {
    refs.scrollToTopEl.classList.remove('scroll-to-top--hidden');
    return;
  }
  refs.scrollToTopEl.classList.add('scroll-to-top--hidden');
}