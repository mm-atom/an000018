import { getLogger } from 'log4js';
import { createClient } from 'redis';
import config from '@mmstudio/config';

const logger = getLogger();
const REDIS = config.redis;

export default function an18(key: string) {
	return new Promise<boolean>((resolve, reject) => {
		const client = open();
		return client.del(key, (error, res) => {
			if (error) {
				logger.error(error);
				resolve(false);
				client.end(false);
			} else {
				client.end(true);
				resolve(res === 0);
			}
			client.quit();
		});
	});
}

function open() {
	const client = createClient(REDIS.url);
	client.on('error', (e) => {
		logger.error(e);
		logger.error('Redis Error thrown, process will exit with code -1');
		process.exit(-1);
	});
	return client;
}
