const http = require("http");
const url = require('url');
const fs = require('fs');

let SECRET = "", words = [], count = 0; // You can set any word as the secret answer

try {
	words = String(fs.readFileSync("wordList.txt", "utf8")).toUpperCase().split(",");
} catch (errorTxt) {
	console.error(errorTxt);
}

function generateSECRET() {
	try {
		SECRET = String(words[Math.floor(Math.random() * (words.length - 1))]).toUpperCase();
	} catch (errorTxt) {
		console.log(errorTxt);
	}
}

function compareSecret(x) {
	var z = String(x).toUpperCase(), y = "";
	if (!words.toString().includes(z)) {
		y = "rrrrr";
		return y;
	}
	for (var i = 0; i < 5; i++) {
		if (z.charAt(i) == SECRET.charAt(i)) {
			y += 'g';
		} else if ((SECRET.substring(0, i) + SECRET.substring(i + 1, SECRET.length)).includes(z.charAt(i))) {
			y += 'y';
		} else {
			y += 'b';
		}
	}
	return String(y);
}

function myFunction(req, res) { // request, response
	var fullURL = req.url, stringFullURL = String(fullURL); 

	//console.log({req}); // You can uncomment this to see the request object
	console.log(fullURL);

	//var PATH = url.parse(fullURL, true), PATHNAME = PATH.pathname;

	if(count == 0) {
		generateSECRET();
	}

	switch (stringFullURL) {
		case '/index.html':
			// 200 implies response success & 404 implies response failure
			fs.readFile(__dirname + stringFullURL, (error, data) => {
				if (error) {
					res.writeHead(404);
					res.write(error);
					res.end();
				} else {
					res.writeHead(200, {
						'Content-Type': 'text/html',
						"Access-Control-Allow-Origin": "*"
					});
					res.write(data);
					res.end();
				}
			});
			break;
		case '/newkeygen':
			res.write(SECRET);
			count = 0;
			break;
		default:
			res.writeHead(200, {
				'Content-Type': 'text',
				"Access-Control-Allow-Origin": "*"
			});
			if (count == 8) {
				count = 0;
				res.write(SECRET);
				res.end();
			} else {
				++count;
				const getQuery = () => {
					var x = String(fullURL);
					if(!x.includes("wordle"))
						return x;
					x  = x.substring(10, String(fullURL).length);
					// /wordle?q= is of length 10 so index 9 is the last char and we must take substring from index 10
					return x;
				};
				const GUESS = getQuery(); // Write logic to parse the word which the user guessed from the URL string
				let feedback = compareSecret(GUESS); // Write logic to compare the word with the secret, and generate the feedback string
				res.write(feedback);
				console.log(feedback + " " + SECRET);
				res.end();
			}
			break;
	}
}

http.createServer(myFunction).listen(process.env.PORT || 5000);
