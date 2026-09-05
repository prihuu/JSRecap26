let x1 = Number(prompt("Enter x1:"));
let y1 = Number(prompt("Enter y1:"));

let x2 = Number(prompt("Enter x2:"));
let y2 = Number(prompt("Enter y2:"));

let distance = Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
);

document.getElementById("result").innerHTML =
    "The distance between the two points is: " + distance;