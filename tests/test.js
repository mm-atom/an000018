const test = require('ava');

const { default: a } = require('../dist/index');

test('redis remove', async (t) => {
	const r = await a('key');
	t.is(r, true);
});
