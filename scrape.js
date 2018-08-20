const agent = require('superagent').agent();
const cheerio = require('cheerio');
const Bluebird = require('bluebird');
const _ = require('lodash');

function takeCourses(user, courses, firerate = 3000, request = agent, counter = 1,) {
    setTimeout(() => {
        console.log("Attempt #", counter);
        Bluebird.map(courses, (course) => {
            return generateCourseRequest(request, user, course);
        })
            .then(responses => {
                _.each(responses, printRequestResult);
                console.log("Attempt #", counter, "complete");
                takeCourses(user, courses, firerate, request, counter + 1);
            })
            .catch(err => {
                console.error(err);
                console.log("Attempt #", counter, "error");
                takeCourses(user, courses, firerate, request, counter + 1);
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

const generateCourseRequest = (request, user, course) => {
    const requestObject = request.post('http://akademik3.its.ac.id/list_frs.php')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .timeout({ response: 7000 });
    if (user.cookie) {
        requestObject.set('Cookie', user.cookie);
    }
    return requestObject
        .send({
            'nrp': user.nrp,
            'act': 'ambil',
            'key': course,
        });
}

module.exports = {
    takeCourses
}
