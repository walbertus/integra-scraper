const { takeCourses } = require('./scrape');

const { user, courses, delayEachRequest } = require('./config.json');

console.log("Begin gathering courses...");
console.log("Made by William AD");
console.log("https://www.linkedin.com/in/walbertus");
console.log("https://github.com/walbertus");
console.log("Last test : Genap 2017/2018");
takeCourses(user, courses, delayEachRequest);
