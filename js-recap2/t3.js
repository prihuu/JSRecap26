let numbers = [];

let input = prompt("Enter a number (or 'done' to finish):");

while (input !== "done") {
    numbers.push(Number(input));
    input = prompt("Enter a number (or 'done' to finish):");
}

let evenNumbers = [];
for (let number of numbers) {
    if (number % 2 === 0) {
        evenNumbers.push(number);
    }
}

if (evenNumbers.length > 0) {
    document.getElementById("result").innerHTML =
        "Even Numbers: " + evenNumbers.join(", ");
} else {
    document.getElementById("result").innerHTML =
        "Even Numbers: None";
}

document.getElementById("result").innerHTML +=
    "<br>End of program.";