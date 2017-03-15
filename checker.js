
/* jshint node: true */
/* jshint esnext: true */

'use strict';

const data = [];

let fs = require('fs');

let victories_dir = '../../victories-large';

//let victories_dir = './victories';

let files = fs.readdirSync(victories_dir);

files.forEach(function(file) {
    console.log("file :"+file);
    let obj = JSON.stringify(JSON.parse(fs.readFileSync(victories_dir + "/" + file, 'utf8')));
//    console.log(obj);
    data.push(obj);
});

console.log("data.length "+data.length);

for (let idx = 0; idx < data.length; idx++) {
    let check = data[idx];
    for (let jdx = idx + 1; jdx < data.length; jdx++) {
        if (check === data[jdx]) {
            console.log("**********************");
            console.log("Duplicate: idx "+idx+" jdx "+jdx);
            console.log("check: "+check);
            console.log("data[jdx] "+data[jdx]);
            console.log("**********************");
        }
    }
}
