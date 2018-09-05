const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
let originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const nextButton = document.querySelector("#nxt");
let infoTab = document.querySelector(".intro p");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var errorsMade = 0;
var score_word = 0;
var score_pillup = [];
var wpm_pillup = [];
var error_pillup = [];
var wpm = 0;
var done = false;
var words = ["crazy feeling i had last night, watching the manchester united game",
             "Liverpool is a very wonderful team, they rock!!",
             "chelsea dey do initial gra gra, very soon their normal behavior go show.",
             "i hate the movies they show on dstv, gosh this house is just soo boring",
             "i feel tired already without doing anything",
             "many people have a wrong thinking about my behavior towards reaching out to them and always asking after them",
             "But nobody cares about me, i havent had a missed call for the past 2 months",
             "i feel soo lonely, i wish i was more open about my feeling, but thats not the way i was brought up.",
             "Congrats you have Completed the test"];
var counter = 0;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    if (counter < words.length){
    let textval = originText.innerHTML
    let textEntered = testArea.value;
    let originTextMatch = textval.substring(0,textEntered.length);
    if (textEntered == textval) {
        clearInterval(interval);
        let t_time = (timer[0]*60) + (timer[1]) + (timer[2]/100);
        //originText.innerHTML = errorsMade;
        let n_word = textval.length
        console.log(n_word);
        console.log(t_time);
        let score_me = ((score_word - errorsMade)/ t_time) * 10;
        wpm = n_word/t_time;
        done = true;
        score_pillup.push(score_me.toFixed(2));
        wpm_pillup.push(wpm.toFixed(2));
        error_pillup.push(errorsMade);
        infoTab.innerHTML = "Score: " + score_me.toFixed(2)
                             +"<br>Words per Seconds: " + wpm.toFixed(2)
                            + "<br>Errors Made: "+ errorsMade;
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
            score_word += 2;
        } else {
            testWrapper.style.borderColor = "#E95D0F";
            errorsMade++;
        }
    }
    
    console.log(wpm.toFixed(2));
    console.log(errorsMade);
    console.log(score_word);
    console.log(score_pillup);
    //console.log (score_total);
    console.log(wpm_pillup);
    console.log(error_pillup);
    }
}

// Start the timer:
function start() {
    if(counter < words.length){
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    }   
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    errorsMade = 0;
    score_word = 0;
}

function changeQuestion() {
    // let defaultext= document.getElementById('placeholder');
    if (counter < words.length && done == true){
    originText.innerHTML=words[counter];
    counter++;
    reset();
    infoTab.innerHTML = ""
    console.log(originText.innerHTML);
    done = false;
    if (counter == words.length){
        nextButton.style.visibility = 'hidden';
        let new_wpm_pillup = wpm_pillup.map(function (x){
            return parseFloat(x);
        });
        let new_score_pillup = score_pillup.map(function (x) { 
            return parseFloat(x); 
          });
        let score_total = (new_score_pillup.reduce((a, b) => a + b, 0)) / words.length;
        let wpm_total = (new_wpm_pillup.reduce((a, b) => a + b, 0))/ words.length;
        let errors_total = error_pillup.reduce((a,b) => a + b, 0);
        infoTab.innerHTML =" TOTAL GAME SCORE: " + score_total.toFixed(2) +
                            "<br> AVERAGE WORDS PER SECONDS: " + wpm_total.toFixed(2) +
                            "<br> TOTAL ERRORS MADE: "+ errors_total;
        console.log(score_total);
        console.log(wpm_total);
        console.log(errors_total);
        }
    } 
}


console.log(originText.innerHTML);

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
nextButton.addEventListener("click", changeQuestion, false);


