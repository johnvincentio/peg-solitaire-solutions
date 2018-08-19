//

/* eslint-disable no-plusplus */

const data = [];

const fs = require('fs');

const VICTORIES_DIR = 'victories';

const files = fs.readdirSync(VICTORIES_DIR);

files.forEach(file => {
	console.log(`file :${file}`);
	const obj = JSON.stringify(JSON.parse(fs.readFileSync(`${VICTORIES_DIR}/${file}`, 'utf8')));
	// console.log(obj);
	data.push(obj);
});

console.log(`data.length ${data.length}`);

for (let idx = 0; idx < data.length; idx++) {
	const check = data[idx];
	for (let jdx = idx + 1; jdx < data.length; jdx++) {
		if (check === data[jdx]) {
			console.log('**********************');
			console.log(`Duplicate: idx ${idx} jdx ${jdx}`);
			console.log(`check: ${check}`);
			console.log(`data[jdx] ${data[jdx]}`);
			console.log('**********************');
		}
	}
}
