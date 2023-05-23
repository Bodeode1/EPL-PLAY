const username = document.querySelector(".username");
const date = document.querySelector(".date");
const rank = document.querySelector(".rank");
const level_text = document.querySelector(".level");
const reset_btn = document.querySelector(".reset");
const contact_btn = document.querySelector(".box-inputs");

const btn_toggle = document.querySelector(".toggle");
const menu_bar = document.querySelector(".ul");

if (btn_toggle) {
	btn_toggle.onclick = () => {
		if (menu_bar.classList.contains("show")) {
			menu_bar.classList.remove("show");
		} else {
			menu_bar.classList.add("show");
		}
	};
}

if (contact_btn) {
	contact_btn.onsubmit = (e) => {
		e.preventDefault();
		let message = document.querySelector(".contact-message");

		contact_btn.classList.add("hide");
		message.classList.add("show");
	};
}

const addToProfile = () => {
	let user = localStorage.getItem("username");
	let dateTime = localStorage.getItem("date");
	let levelStorage = localStorage.getItem("level");

	username.textContent = user
		? `Username: ${user}`
		: "No Profile detected. You can start a game by providing your name.";

	date.textContent = dateTime ? `Last Game Played On: ${dateTime}` : "";
	rank.textContent = levelStorage
		? levelStorage == 1
			? "Rank: Novice"
			: levelStorage == 2
			? "Rank: Upcoming"
			: levelStorage == 3
			? "Rank: Football Fan"
			: levelStorage == 4
			? "Rank: Professional"
			: "Rank: Expert"
		: "Rank: Beginner";
	level_text.textContent = levelStorage
		? `Level: ${levelStorage}`
		: "Level: 1";
	if (!user) {
		reset_btn.style.display = "none";
	}
};

if (reset_btn) {
	addToProfile();
	reset_btn.onclick = () => {
		localStorage.removeItem("username");
		localStorage.removeItem("level");
		localStorage.removeItem("date");
		window.location.reload();
	};
}
