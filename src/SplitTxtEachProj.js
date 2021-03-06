/**
 * Created by Tom on 08/09/2015.
 * Reads and splits rawProfileData.txt into array where elements holds raw project data
 *
 **/
//import module
//require('./parseProjDatafromJSON');
module.exports.split = split;

    function split() {
    var fs = require('fs');

    var fileContent;

    function readfile(callback) {
        fs.readFile('rawProfileContent2.txt', 'utf-8', function (err, data) {
            if (err) {
                console.log("caller is " + arguments.callee.caller.toString());
                throw(err);
            }
            fileContent = data;
            // will call function to parse and write file when file has been read
            callback()
        });
    }

//splits dump of data into array of individual projects
    function splitRawtoJSON() {
        //split text by project
        projectRawArr = fileContent.split(/<!DOCTYPE html>/g);
        //console.log(projectRawArr);
        //write to json file
        console.log('split');
        fs.writeFile('individualProjectsRaw.json', JSON.stringify(projectRawArr, ''), function (err) {
            if (err) throw err;
        });
    }

//read file then pass in parsing function to callback after file is read
// then write array to JSON
    readfile(splitRawtoJSON);
}
