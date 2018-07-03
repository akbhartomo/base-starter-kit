import foo from './foo';
import component from './components';

const bootstrapFunction = (() => {
  let animateBall = () => {
    foo();
  };

  let rellax = () => {
    component();
  }

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
  };

  let init = () => {
    timeOutButton();
    animateBall();
    rellax();
    // Grab the functions you want activate
  };

  // Here is to render the function from init variable
  return {
    init: init
  };
})();

bootstrapFunction.init();
