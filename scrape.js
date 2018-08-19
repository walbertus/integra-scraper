const request = require('superagent');
const cheerio = require('cheerio');
const Bluebird = require('bluebird');
const _ = require('lodash');

function takeCourses(user, courses, firerate = 3000, counter = 1) {
    setTimeout(() => {
        console.log("Attempt #", counter);
        Bluebird.map(courses, (course) => {
            return generateCourseRequest(user, course);
        })
            .then(responses => {
                _.each(responses, printRequestResult);
                console.log("Attempt #", counter, "complete");
                takeCourses(user, courses, firerate, counter + 1);
            })
            .catch(err => {
                console.error(err);
                console.log("Attempt #", counter, "error");
                takeCourses(user, courses, firerate, counter + 1);
            })
    }, firerate);
}

const printRequestResult = (response) => {
    var $ = cheerio.load(response.text);
    $('font').each(function () {
        const text = $(this).text().trim();
        if (text.startsWith('- ')) console.log(text);
    })
}

const generateCourseRequest = (user, course) => {
    return request.post('http://akademik3.its.ac.id/list_frs.php')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Cookie', user.cookie)
        .timeout({ response: 7000 })
        .send({
            'nrp': user.nrp,
            'act': 'ambil',
            'key': course,
        });
}

module.exports = {
    takeCourses
}
