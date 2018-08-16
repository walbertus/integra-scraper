const { takeCourses } = require('./scrape');

const { user, courses, delayEachRequest } = require('./config.json');

console.log("Begin gathering courses...");
takeCourses(user, courses, delayEachRequest);
