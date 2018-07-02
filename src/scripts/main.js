import foo from './foo';

const bootstrapFunction = (() => {
  let animateBall = () => {
    foo();
  };

  // Each function want you to create, make it them to be variable functions
  // ES6 supports

  let timeOutButton = () => {
    setTimeout(() => {
      $('#btnSplendid').css({
        background: '#F55555',
        borderRadius: '10em',
        border: '1px solid #333'
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

bootstrapFunction.init();
