var train = new Firebase("https://sweltering-fire-3188.firebaseio.com/");

// Function for the button
$("#trainSubmit").on("click", function () {

    // Grabs user input
	var Name = $("#trainName").val().trim();
	var Dest = $("#trainDest").val().trim();
	var Time = moment($("#trainTime").val().trim(), "HH:mm").format("HH:mm");
	var Freq = $("#trainFreq").val().trim();


    // This makes the object needed
	var newTrain = {
		name: Name,
		dest: Dest,
		time: Time,
		freq: Freq
    }

    // Adds the new train to firebase
	trainData.push(newTrain);

	// Clear all of the divs
	$("#trainName").val("");
	$("#trainDest").val("");
	$("#trainTime").val("");
	$("#trainFreq").val("");

    return false;
});

// Use firebase and make a new row for the new train
trainData.on("child_added", function (childSnapshot, prevChildKey) {

	// Needed Variables
	
	var nextArr = moment().diff(moment.time);
	var minAway = moment().diff(moment.time);
	var Name = childSnapshot.val().name;
	var Dest = childSnapshot.val().dest;
	var Time = childSnapshot.val().time;
	var Freq = childSnapshot.val().freq;
	


	// Use first arrival time and frequency to calculate the next arrival time
	var nextArr = moment().diff(moment.unix(Time, 'X'), "months");	
	

	$("#trains > tbody").append("<tr><td>" + Name + "</td><td>" + Dest + "</td><td>" + Freq + "</td><td>" + nextArr + "</td><td>" + minAway + "</td><tr>");


});
