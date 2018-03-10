const { scrape } = require('./scrape');

const { user, matkul, firerate } = require('./config.json');

console.log("Begin scraping...");
scrape(user, matkul, firerate, 1);