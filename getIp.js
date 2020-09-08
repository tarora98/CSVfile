const csv = require('csv-parser');
const fs = require('fs');

var address = "103.216.82.155";
var i = 0, result = 0, num = 0, str = " ", j = 3;
while (true) {
    if (address.charAt(i) == '.') {
        result += (num) * Math.pow(256, j);
        num = 0;
        j--;
        str = "";
    }
    else {
        str += address.charAt(i);
        num = parseInt(str);
    }
    i++;
    if (i == address.length) {
        result += (num) * Math.pow(256, j);
        break;
    }
}
console.log(result);

fs.createReadStream('IP2LOCATION-LITE-DB1.csv')
    .pipe(csv())
    .on('data', (row) => {
        if(row.TO <= result && result<=row.FOR){
            console.log(row.CODE);
            console.log(row.NAME);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });