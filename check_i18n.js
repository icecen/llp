const fs = require('fs');
const content = fs.readFileSync('i18n.js', 'utf8');
const lines = content.split('\n');
console.log("Total lines:", lines.length);
console.log("Line 230:", lines[229]);
console.log("Line 236:", lines[235]);
console.log("Line 237:", lines[236]);
