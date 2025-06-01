const HOST = 'http://localhost';
const PORT = '6032';

import Handler from './handler';

const handler = new Handler(HOST, PORT);
handler.update();

let url = window.location.href;
setInterval(() => {
	if (window.location.href === url) return;
	url = window.location.href;

	handler.update();
}, 10000);