import './style.css'

export default {
	container: null,

	create(el, className, text) {
		const element = document.createElement(el);
		if (className) element.className = className + '-rcrpcthing';
		if (text) element.textContent = text;

		return element;
	},

	init() {
		this.container = this.create('div', 'container');
		document.body.appendChild(this.container);
	},

	send(text, dur, color) {
		const notif = this.create('div', 'notif');
		notif.style.background = color;

		const content = this.create('div', 'notif-content');
		const notifText = this.create('span', 'notif-text', text);
	
		content.appendChild(notifText);
		notif.appendChild(content);

		if (dur > 0) {
			const durBar = this.create('div', 'notif-bar');
			durBar.style.animation = `progress-shrink ${dur * 1000}ms linear`;
			notif.appendChild(durBar);
		}

		notif.addEventListener('click', () => {
			this.remove(notif);
		});

		this.container.appendChild(notif);

		requestAnimationFrame(() => {
			notif.style.transform = 'translateX(0)';
			notif.style.opacity = '1';
		});

		if (dur > 0) {
			setTimeout(() => {
				this.remove(notif);
			}, dur * 1000);
		}

		return notif;
	},

	remove(notif) {
		if (!notif.parentNode) return;

		notif.style.transform = 'translateX(100%)';
		notif.style.opacity = '0';

		setTimeout(() => {
			if (!notif.parentNode) return;
			notif.parentNode.removeChild(notif);
		}, 300);
	}
};
