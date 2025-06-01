import hurawatch from './hurawatch';
import hianime from './hianime';

export default {
	websites: [
		'hurawatch',
		'hianimez'
	],

	getWebsite(url) {
		return this.websites.find(t => url.includes(t));
	},

	'hurawatch': {
		title: hurawatch.getTitle,
		episode: hurawatch.getEpisode,
		imgUrl: hurawatch.getImgUrl
	},

	'hianimez': {
		title: hianime.getTitle,
		episode: hianime.getEpisode,
		imgUrl: hianime.getImgUrl
	}
};