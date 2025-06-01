export default {
	getTitle: () => {
		const title = document.querySelector('h2.film-name a');
		return title ? title.getAttribute('title').trim() : '';
	},

	getEpisode: () => {
		const episode = document.querySelector('.ssl-item.ep-item.active');
		return episode ? 'EP ' + episode.getAttribute('data-number').trim() : 'EP 0';
	},

	getImgUrl: () => {
		const img = document.querySelector('.film-poster img');
		return img ? img.src : '';
	}
};