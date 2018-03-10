const request = require('superagent');
const cheerio = require('cheerio');
const Bluebird = require('bluebird');
const _ = require('lodash');

function scrape(user, matkul, firerate = 10000, counter = 1) {
    setTimeout(() => {
        const process = [];
        console.log("Attempt #", counter);
        _.each(matkul, mat => {
            process.push(
                request.post('http://akademik3.its.ac.id/list_frs.php')
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Cookie', user.cookie)
                    .timeout({response: 10000})
                    .send({
                        'nrp': user.nrp,
                        'act': 'ambil',
                        'key': mat,
                    })
            )
        })
        Bluebird.all(process)
        .then(ress => {
            _.each(ress, res => {
                var $ = cheerio.load(res.text);
                $('font').each(function () {
                    const text = $(this).text().trim();
                    if (text.startsWith('- ')) console.log(text);
                })
            })
            scrape(user, matkul, firerate, counter + 1);
        })
        .catch(err => {
            console.log(err);
            scrape(user, matkul, firerate, counter + 1);
        })
    },firerate);
}

module.exports = {
    scrape
}
