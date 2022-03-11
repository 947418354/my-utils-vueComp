(function() {
  'use strict';
const targetNode = document;
const config = { attributes: true, childList: true, subtree: true };
const callback = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
      if (mutation.target._prevClass === 'language-css') {
          console.log('---hahahahh--')
          document.querySelector('.language-css').innerHTML = document.querySelector('.language-css').innerHTML.replace(/(\d)(px)/g, "$1rpx")
      }
  }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
})();