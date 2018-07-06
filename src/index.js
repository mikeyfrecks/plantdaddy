// import 'promise-polyfill';
// import 'isomorphic-fetch';
import { h, render } from 'preact';
import './style';

import React from 'react';



let root;
function init() {
	let App = require('./components/AppWrap.jsx').default;
	root = render(<App

		      />, document.getElementById("root"), root);
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}
const DEV_ENV = (process.env.NODE_ENV!=='production') ? true : false;
// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();
