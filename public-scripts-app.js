'use strict';

console.log('App.js is running');

//JSX  
var template = React.createElement(
  'p',
  null,
  'I come from JSX file'
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
