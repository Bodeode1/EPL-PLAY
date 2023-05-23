const game_start_btn = document.getElementById("startBtn");
const name_modal = document.querySelector(".name-modal");
const input_details = document.getElementById("inputDetails");
const rules_modal = document.querySelector(".rules-modal");
const name_head = document.querySelector(".name-header");
const quit_btn = document.querySelector(".danger");
const rules_btn = document.querySelector(".rules-btn");
const quiz_modal = document.querySelector(".quiz-modal");
const quiz_btn = document.getElementById("quizBtn");
const time_text = document.querySelector(".timer");
const options = document.querySelector(".options");
const result_modal = document.querySelector(".result-modal");
const quiz_head = document.querySelector(".quiz-head");
const next_stage = document.querySelector(".n-stage");

let counter;
let que_count = 0;
let que_no = 1;
let score = 0;
let correctPick = false;
let mainName;

let storage = localStorage.getItem("username");
let level = localStorage.getItem("level") || 1;

let finalQuestion =
	level == 1
		? level1Questions
		: level == 2
		? level2Questions
		: level == 3
		? level3Questions
		: level == 4
		? level4Questions
		: level5Questions;
let read_timer =
	level == 1 ? 30 : level == 2 ? 25 : level == 3 ? 20 : level == 4 ? 15 : 10;

if (storage) {
	name_head.textContent = `Welcome again, ${storage}`;
	input_details.style.display = "none";
	game_start_btn.textContent = "Next";
}

game_start_btn.onclick = () => {
	if (storage) {
		name_modal.classList.remove("active");
		rules_modal.classList.add("active");
	} else if (input_details.value === "") {
		alert("Please provide your name.");
	} else {
		mainName = input_details.value;
		localStorage.setItem("username", input_details.value);
		name_modal.classList.remove("active");
		rules_modal.classList.add("active");
	}
};

rules_btn.onclick = () => {
	rules_modal.classList.remove("active");
	quiz_modal.classList.add("active");
	quiz_head.textContent = `Level ${level} Quiz`;
	showQuetions(0);
	startTimer(read_timer);
};

quiz_btn.onclick = () => {
	score = correctPick ? score + 1 : score;
	if (que_count < finalQuestion.length - 1) {
		que_count++;
		que_no++;
		showQuetions(que_count);
	} else {
		clearInterval(counter);
		showResult();
	}
};

next_stage.onclick = () => {
	window.location.reload();
};

function showQuetions(index) {
	const question_text = document.querySelector(".question");

	let que =
		"<span>" + `&#33;` + ". " + finalQuestion[index].question + "</span>";
	let option =
		'<div class="option"><span>' +
		finalQuestion[index].options[0] +
		"</span></div>" +
		'<div class="option"><span>' +
		finalQuestion[index].options[1] +
		"</span></div>" +
		'<div class="option"><span>' +
		finalQuestion[index].options[2] +
		"</span></div>" +
		'<div class="option"><span>' +
		finalQuestion[index].options[3] +
		"</span></div>";
	question_text.innerHTML = que;
	options.innerHTML = option;

	const singleOptions = options.querySelectorAll(".option");

	for (i = 0; i < singleOptions.length; i++) {
		singleOptions[i].setAttribute("onclick", "optionSelected(this)");
	}
}

function optionSelected(answer) {
	let userAns = answer.textContent;
	let correcAns = finalQuestion[que_count].answer;
	correctPick = userAns === correcAns ? true : false;

	const allOptions = options.children.length;

	for (i = 0; i < allOptions; i++) {
		if (options.children[i].textContent == userAns) {
			//if there is an option which is matched to an array answer
			options.children[i].classList.add("selected");
		} else {
			options.children[i].classList.remove("selected");
		}
	}
}

function startTimer(time) {
	counter = setInterval(timer, 1000);
	function timer() {
		time_text.textContent = time;
		time--;
		if (time < 9) {
			//if timer is less than 9
			let addZero = time_text.textContent;
			time_text.textContent = "0" + addZero;
		}
		if (time < 0) {
			clearInterval(counter);
			time_text.textContent = "Time Off";
			showResult();
		}
	}
}

function showResult() {
	quiz_modal.classList.remove("active");
	result_modal.classList.add("active");

	localStorage.setItem("date", new Date());

	const result1 = document.querySelector(".result-1");
	const result2 = document.querySelector(".result-2");

	result1.innerHTML = `Hello, ${storage || mainName}.`;

	if (score === 6 && level === 6) {
		result2.innerHTML = `&#128521; Congrats! You've completed all the stages.`;
	} else if (score === 6 && level < 6) {
		localStorage.setItem("level", level + 1);
		level++;
		next_stage.classList.add("show");
		result2.innerHTML = `&#128521; Congrats! You've advanced to the next stage.`;
	} else if (score === 5) {
		result2.innerHTML = `&#128551; You almost made it! Unfortunately, you need to
        answer all correctly.`;
	} else {
		result2.innerHTML = `&#128543; Sorry. You can't proceed to the next stage.`;
	}
}
