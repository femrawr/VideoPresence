import metadata from './utils/metadata';
import notif from './gui/gui';

class Handler {
	constructor(url, port) {
		this.url = url;
		this.port = port;

		notif.init();
		this.notif = notif.send('connecting...', 9, '#333');
	}

	async _getMetadata(website) {
		await new Promise(res => setTimeout(res, 10000));

		const funcs = metadata[website];
		const data = {
			title: funcs.title(),
			episode: funcs.episode(),
			imgUrl: funcs.imgUrl()
		};

		return data;
	}

	async _postData(data) {
		try {
			const res = await fetch(`${this.url}:${this.port}/update`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			});

			const ret = await res.json();

			if (res.ok) {
				notif.send('successfully connected to server', 5, '#4CAF50');
			} else {
				notif.send(`failed to connect: ${ret.error}`, 5, '#F44336');
			}
		} catch (e) {
			notif.send(`failed to connect: ${e.message}`, 5, '#F44336');
		}
	}

	async update() {
		const website = metadata.getWebsite(window.location.href);
		if (!website) {
			notif.send('invalid website', 5, '#F44336');
			notif.remove(this.notif);
			return;
		}

		const data = await this._getMetadata(website);

		await this._postData(data);
	}
}

export default Handler;