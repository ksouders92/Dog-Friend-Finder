// dependencies 
var dogs = require("../data/dogs.js");

module.exports = function (app) {

    //build a route to view all the dogs
    app.get("/api/dogs", function (req, res) {
        res.json(dogs);
    });

    //Adds entered data in the same format as dogs.js
    app.post("/api/dogs", function (req, res) {

        var bestMatch = {
            name: "",
            age: "",
            photo: "",
            friendDifference:  1000
        };

        console.log(req.body);

        // Takes the result of the users survey POST & parse it
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // Variable will calculate the difference between the users' scores & the 
        // scores of each user in the database
        var totalDifference = 0;

        // Nested for loop
        // Loop through all the friend possibilities in the database
        for (var i = 0; i < dogs.length; i++) {
            console.log(dogs[i]);
            totalDifference = 0;
            
            //Loop through all the scores of each friendh
            for (var j=0; j < dogs[i].scores[j]; j++){

            // Calculate the difference between the scores and sum them into totalDifference
            totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(dogs[i].scores[j]));

            // if the sum of the difference is less than the difference of the current "bestMatch"
            if (totalDifference <= bestMatch.friendDifference) {
                debugger;

                // reset the bestMatch to be the new friend
                bestMatch.name = dogs[i].name;
                bestMatch.age = dogs[i].age;
                bestMatch.photo = dogs[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
        }};

        // Save the users data to the dogbase (AFTER the check to avoid user being their own bestMatch)
        dogs.push(userData);

        // Returns JSON with the users bestMatch
        res.json(bestMatch);
    });
}