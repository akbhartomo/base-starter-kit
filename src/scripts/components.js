// import { styler, easing, tween } from "popmotion";

const bootstrapFunction = (() => {
  let animateBall = () => {
    console.log(window.popmotion);
    const {
      easing,
      tween,
      styler
    } = window.popmotion;

    const divStyler = styler(document.querySelector('.box'));
    // const divStyler = document.querySelector('.box');

    tween({
      from: 0,
      to: {x: 300, rotate: 180},
      duration: 1000,
      ease: easing.backOut,
      flip: Infinity
    }).start(divStyler.set);
  };

  // Each function want you to create, make it them to be variable functions
  // ES6 supports

  let timeOutButton = () => {
    setTimeout(() => {
      $('#btnSplendid').css({
        background: '#F55555',
        borderRadius: '10em',
        border: 'none'
      });
    }, 1000);
    console.log('Hello Time Out Button');
  };

  let init = () => {
    timeOutButton();
    animateBall();
    // Grab the functions you want activate
  };

  // Here is to render the function from init variable
  return {
    init: init
  };
})();

// Usage the function to render to browser
bootstrapFunction.init();
