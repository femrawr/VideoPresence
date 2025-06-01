const { Client } = require('discord-rpc');

const express = require('express');
const cors = require('cors');

const colors = require('./utils/colors')

const PORT = '6032';
const app = express();

let rpc = new Client({ transport: 'ipc' });
let CLIENT_ID = '1377836018933301329';

app.use(cors());
app.use(express.json());

process.on('SIGINT', () => {
	console.log('\n' + 'session terminated');
	rpc.destroy();
	process.exit(0);
});

app.listen(typeof PORT === 'string' ? parseInt(PORT) : PORT, () => {
	console.log(colors.GREEN + `app listening on port ${PORT}` + colors.RESET);
});

app.post('/set-id', async (req, res) => {
	try {
		const { clientId } = req.body;

		if (!clientId) {
			return res.status(400).json({
				error: 'clientId is required'
			});
		}

		if (rpc.user) {
			console.log(colors.YELLOW + 'disconnecting from previous connection...' + colors.RESET);
			rpc.destroy();
		}

		CLIENT_ID = clientId;
		rpc = new Client({ transport: 'ipc' });

		rpc.on('ready', () => {
			console.log(colors.GREEN + `successfully connected to discord as: ${rpc.user.username}` + colors.RESET);
			console.log(colors.GREEN + `using application: ${CLIENT_ID}` + colors.RESET);
		});

		await rpc.login({ clientId: CLIENT_ID });

		res.json({
			success: true,
			message: 'successfully updated client id',
			clientId: CLIENT_ID
		});

		console.log(colors.GREEN + `client id updated to: ${CLIENT_ID}` + colors.RESET);
	} catch (e) {
		console.error(colors.RED + `failed to update client id: ${e}` + colors.RESET);
		res.status(500).json({
			success: false,
			error: e.message
		});
	}
});

app.post('/update', async (req, res) => {
	try {
		const { title, episode, imgUrl, start } = req.body;

		if (!title || !episode) {
			return res.status(400).json({
				error: 'title, episode is required'
			});
		}

		const { suc, resp } = await setPresence(title, episode, imgUrl, start);
		if (!suc) {
			res.status(500).json({
				success: false,
				error: `failed to update presence: ${resp}`
			});

			return;
		}

		res.json({
			success: true,
			message: `successfully updated presence: ${resp}`
		});
	} catch (e) {
		console.error(colors.RED + `failed to update: ${e}` + colors.RESET);
		res.status(500).json({
			success: false,
			error: e.message
		});
	}
});

app.post('/clear', async (_, res) => {
	try {
		await rpc.clearActivity();
		console.log(colors.GREEN + 'successfully cleared presence' + colors.RESET);
	} catch (e) {
		console.error(colors.RED + `failed to clear presence: ${e}` + colors.RESET);
		res.status(500).json({
			success: false,
			error: e.message
		});
	}
});

const setPresence = async (title, episode, imgUrl, website) => {
	if (!rpc.user) {
		console.log(colors.YELLOW + 'discord is not connected yet' + colors.RESET);
		return {
			suc: false,
			res: 'discord is not connected yet'
		};
	}

	const activity = {
		state: `Watching: ${title} ${episode}`,
		largeImageKey: imgUrl || '',
		largeImageText: `${title} ${episode}`,
		startTimestamp: Date.now()
	};

	try {
		await rpc.setActivity(activity);

		return {
			suc: true,
			res: null
		};
	} catch (e) {
		return {
			suc: false,
			res: e.message
		}
	}
};

if (CLIENT_ID !== '') {
	rpc = new Client({ transport: 'ipc' });

	rpc.on('ready', () => {
		console.log(colors.GREEN + `connected to discord as: ${rpc.user.username}` + colors.RESET);
		console.log(colors.GREEN + `using application: ${CLIENT_ID}` + colors.RESET);
	});

	rpc.login({ clientId: CLIENT_ID }).catch(e => {
		console.log(colors.RED + `failed to log in: ${e.message}` + colors.RESET);
	});
}