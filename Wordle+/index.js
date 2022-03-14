const http = require("http");
const url = require('url');
const fs = require('fs');

let SECRET = ""; // You can set any word as the secret answer

try {
	const words = String(fs.readFileSync("wordList.txt", "utf8")).split(","); // Credit: NYT Wordle Wordlist
	SECRET = String(words[Math.floor(Math.random() * (words.length - 1))]).toUpperCase();
} catch(errorTxt) {
	console.error(errorTxt);
}

function compareSecret(x){
	var z = String(x).toUpperCase(), y = "";
	for(var i = 0; i < 5; i++) {
		if(z.charAt(i) == SECRET.charAt(i)) {
			y += 'g';
		} else if((SECRET.substring(0, i) + SECRET.substring(i + 1, SECRET.length)).includes(z.charAt(i))) {
			y += 'y';
		} else {
			y += 'b';
		}
	}
	return String(y);
}

function myFunction(req, res) {
	// console.log({req}); // You can uncomment this to see the request object
	console.log(req.url);

	const GUESS = String(url.parse(req.url, true).query["q"]); // Write logic to parse the word which the user guessed from the URL string
	let feedback = compareSecret(GUESS); // Write logic to compare the word with the secret, and generate the feedback string

	res.write(feedback);
	console.log(feedback + " " + SECRET);
	res.end();
}

http.createServer(myFunction).listen(process.env.port || 8080);
