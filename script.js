console.log("Script (ALL) is running.");

let data = null;
let max_level = null;
let ans_status = "";
let level = 1;
let points = 0;

const level_p = document.getElementById("level_p");
const points_p = document.getElementById("points");
const question = document.getElementById("question");
const input = document.getElementById("answer");
const output = document.getElementById("output");
const button_check = document.getElementById("check");
const button_next = document.getElementById("next");
document.addEventListener("DOMContentLoaded", () => {});

button_next.disabled = true;

get_data().then(() => {
    max_level = data.length;

    print();

    button_check.onclick = check;
    button_next.onclick = next;
});

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        if (!button_check.disabled) {
            check();
        } else if (!button_next.disabled) {
            next();
        }
    }
});

input.addEventListener("input", () => {
    button_check.disabled = input.value.trim() === "";
});

function get_data() {
    let path = "countries.json";

    return fetch(path)
        .then(response => response.json())
        .then(json => {
            data = Object.entries(json);
            data.sort(() => Math.random() - 0.5);
        });
}

function print() {
    level_p.innerHTML = "Level: <b>" + level + "</b>";
    points_p.innerHTML = "Points: <b>" + points + "/" + level + "</b>";
    question.innerHTML = "Question: What's the capital city of <b>" + data[level - 1][0] + "</b>?";
    output.innerHTML = "Your answer is: " + ans_status;
}

function check() {
    if (input.value.trim() === data[level - 1][1]) {
        ans_status = "<span class='correct'>True!</span>";
        points += 1;
    } else {
        ans_status = `<span class='wrong'><b>False!</b> The right answer would have been <b>${data[level-1][1]}</b>.</span>`;
    }

    input.readOnly = true;
    button_next.disabled = false;
    button_check.disabled = true;

    print();
}

function next() {
    if (input.readOnly === true) {
        level += 1;

        if (level === max_level) {
            level_p.textContent = "Finished";
            question.textContent = "Congratulations! You finished the quiz!";
            output.textContent = "";
            input.value = "";
            button_check.disabled = true;
            button_next.disabled = true;
            return;
        }

        input.readOnly = false;
        input.value = "";
        ans_status = "";
        button_check.disabled = false;
        button_next.disabled = true;

        print();
    }
}