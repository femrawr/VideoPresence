import hurawatch from './hurawatch';

export default {
	websites: [
		'hurawatch'
	],

	getWebsite(url) {
		return this.websites.find(t => url.includes(t));
	},

	'hurawatch': {
		title: hurawatch.getTitle,
		episode: hurawatch.getEpisode,
		imgUrl: hurawatch.getImgUrl
	}
};