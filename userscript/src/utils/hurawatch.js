export default {
	getTitle: () => {
		const title = document.querySelector('h2.heading-name a');
		return title ? title.textContent.trim() : '';
	},

	getEpisode: () => {
		const seasonEl = document.querySelector('#current-season');
		const season = seasonEl ? seasonEl.textContent.trim() : '';

		const episodeEl = document.querySelector('.eps-item.active');
		const episode = episodeEl ? episodeEl.getAttribute('title').trim() : '';

		const seasonRet = season.replace('Season', 'S').replaceAll(' ', '');
		const episodeRet = episode.match(/^Eps (\d+)/);

		return `${seasonRet} ${episodeRet ? episodeRet[0].toUpperCase().replace('EPS', 'EP') : 'EP 0'}`;
	},

	getImgUrl: () => {
		const img = document.querySelector('.film-poster-img');
		return img ? img.src : '';
	}
};