let side1 = Number(prompt("Enter the length of the first side:"));
let side2 = Number(prompt("Enter the length of the second side:"));
let side3 = Number(prompt("Enter the length of the third side:"));

let result;

if (side1 === side2 && side2 === side3) {
    result = "The triangle is equilateral.";
} else if (side1 === side2 || side1 === side3 || side2 === side3) {
    result = "The triangle is isosceles.";
} else if (!(side1 === side2 || side1 === side3 || side2 === side3)) {
    result = "The triangle is scalene.";
}

document.getElementById("result").innerHTML = result;