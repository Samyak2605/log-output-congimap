const fs = require('fs');

// Read from mounted config file
let fileContent = 'file not found';
try {
  fileContent = fs.readFileSync('/etc/config/information.txt', 'utf8');
} catch (err) {
  console.error('Could not read file:', err.message);
}

const message = process.env.MESSAGE || 'MESSAGE not set';

console.log(`file content: ${fileContent}`);
console.log(`env variable: MESSAGE=${message}`);
console.log(`${new Date().toISOString()}: Ping / Pongs: 3`);
