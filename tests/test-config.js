const { readFileSync } = require('node:fs');
const path = require('node:path');

const propertiesPath = path.join(__dirname, '..', 'config.properties');
const properties = Object.fromEntries(
   readFileSync(propertiesPath, 'utf8')
      .replace(/^\uFEFF/, '')
      .split(/\r\n|\n|\r/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#') && !line.startsWith('!'))
      .map(line => {
         const separator = line.indexOf('=');
         if (separator <= 0) {
            throw new Error(`Invalid property in ${propertiesPath}: ${line}`);
         }
         return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      })
);

function getProperty(key) {
   const value = properties[key];
   if (!value) {
      throw new Error(`Missing required property "${key}" in ${propertiesPath}`);
   }
   return value;
}

module.exports = { getProperty };
