const fs = require('fs');
const lines = [];
lines.push('test line 1');
lines.push('test line 2');
fs.writeFileSync('services.html', lines.join('\n'), 'utf8');
console.log('done');
