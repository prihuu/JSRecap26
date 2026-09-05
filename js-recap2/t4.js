function sortArray(numbers) {
    let sortedNumbers = [...numbers];
    sortedNumbers.sort((a, b) => a - b);
    return sortedNumbers;
}

let numbers = [8, 3, 12, 1, 5, 10];

console.log("Original array:", numbers);

let sortedArray = sortArray(numbers);
console.log("Sorted array:", sortedArray);