console.log("Moodle+ successfully loaded!");

const login_element = document.querySelector("#login"); // Fill the selector for the login element in ""
let login_text = login_element.innerText;

function isNum(x) {
    return "123456789".includes(String(x));
}
let question = login_text.split("\n")[3], qnChars = question.split(""); // Use split and array operations on the login_text string to extract the question
function getKey() {
    var x = "add subtract second first".split(" ");
    for(var j = 0; j < 4; j++)
        if(question.includes(x[j]))
            return x[j];
    return "";
}
var nums = ["", ""], key = getKey(); // Only two numbers to extract each time
for(var i = 0, count = 0; i < qnChars.length; i++) {
    if(isNum(qnChars[i])) {
        nums[count] += qnChars[i];
    } else if(nums[count].length > 0)
        count = 1;
}

function getAns() {
    switch(String(key)) {
        case "add": return parseInt(nums[0]) + parseInt(nums[1]); break;
        case "subtract": return parseInt(nums[0]) - parseInt(nums[1]); break;
        case "second": return parseInt(nums[1]); break;
        case "first": return parseInt(nums[0]); break;
        default: alert("Error in Captcha. Please reload the page or contact the Developers."); return ""; break;    
    }
}

let answer = getAns(); // Use if conditions to parse the question and calculate the answer. Make cases for all types of captcha asked

const captcha_input_element = document.querySelector("#valuepkg3"); // Fill the selector for the captcha input element in ""
captcha_input_element.value = answer;

// BONUS

const username = document.querySelector("#username"), password = document.querySelector("#password");
username.value = "";
password.value = "";
document.querySelector("#loginbtn").click();