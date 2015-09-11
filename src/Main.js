//Gets links and writes dump of profile data to file
//
// import modules.
var async = require("async");
var fs = require('fs');
require('./ProjectClass.js');
var p = require('./parseProjDatafromJSON');
var split = require('./SplitTxtEachProj.js');
var request = require("request");

// array is temporary hold for profile dumps
var t = [];
// all profile urls consist of this url
var baseURL = 'https://www.lendwithcare.org/';
function getProfileLinks(callback) {

// import function to get links
    var GetProfileLinks = require('./GetProfileLinks_FromDump.js');
// calls function from getlinksfromdump module that parses JSON object and returns array of profile links
    var linksArr = GetProfileLinks.getProfileLinks;

callback(null, linksArr);
}




    /*

     //count responses received
     var responseCount = 0;
     //scrape profiles
     for (var i = 0; i < 40; i++) {
     //concatenate base url with profile link url to give request url
     var urlCur = baseURL + linksArr[i];

     request(urlCur, function (error, response, body) {
     t.push(body);
     // increment response counter to keep track of responses received
     if (response) {
     responseCount++
     }
     // this should be set to (last loop value -1) to ensure file is written after
     // all responses have been received
     if (responseCount === 39) {
     writeToFile(t, callback);

     }
     });
     }
     */

function ProfileScrapes(linksArr, callback){
    async.forEach((linksArr), function (url, callback) { //The second argument (callback) is the continues the control flow
        var urlCur = baseURL + url;
        console.log(urlCur);
        request(urlCur, function (error, response, body) {
            t.push(body);
            console.log(url);
        }, function (err) {
            //When all requests done
            if(err) console.log('error with request for' + url);
           // console.log('finished!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
           // callback()
        });

    });
    callback();
}

function writeToFile(data) {
    fs.writeFile('rawProfileContent2.txt', data, function () {
        console.log('file written!!!!!!!!');
        //split.split();
        callback();
    })
}

    async.series([
            function getMyLinks(callback){
                // get links from casper links collection and scrape each profile then dump all contents
                console.log('step one!');
                getProfileLinks(function(){
                    console.log('ok got links - ');
                    callback(null, 'two3');
                });
            },
            function scrapeEach(linksArr, callback){
                //scrape each profile
                console.log('step one!');
                getProfileLinks(function(){
                    console.log('each profile has been scraped......');
                    callback(null, '2two');
                });
            },
        function writeDump(callback){
            // write dump to rawcontent2 file
            console.log('step one!');
            writeToFile(function(){
                console.log('ok done -written to file');
                callback(null, 'tw3o');
            });
        },
        function alis(callback){
            // split files from dumped contents to individual projs and write to individualprojectsRaw.json
            console.log('step two! - alis run');
            split.split ( function() {
                console.log('ok done split of files to indididualprojs.json ');
                callback(null, 'three');
            });
        },
        function writeAttributesJSON(callback){
            // get links from casper links collection and scrape each profile then dump all contents
            console.log('step three!');
            p.parsey(function(){
                console.log('ok final parse done');
                callback(null, 'four');});
        }
    ],
// optional callback
    function(err, results){
        // results is now equal to ['one', 'two']
        console.log(err);
    });
