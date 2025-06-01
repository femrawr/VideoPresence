// ==UserScript==
// @name         VideoPresence
// @version      30/5/2025
// @description  discord rpc for hurawatch and more
// @author       femrawr
// @match        https://hurawatch.cc/*
// ==/UserScript==

(() => {
	'use strict';

	fetch('https://raw.githubusercontent.com/femrawr/VideoPresence/refs/heads/main/userscript/main.min.js')
		.then(res => {
			if (!res.ok) throw new Error(`http error, status: ${res.status}`);
			return res.text();
		})
		.then(src => new Function(src)())
		.catch(_ => console.error('an error occurred while executing'));
})();