// const countries = [
// 	"Albania",
// 	"Bolivia",
// 	"Canada",
// 	"Denmark",
// 	"Ethiopia",
// 	"Finland",
// 	"Germany",
// 	"Hungary",
// 	"Ireland",
// 	"Japan",
// 	"Kenya",
// ];
// Filter out countries which have more than one 'a' without the filter method

// /
// //Print the first country, middle and last
// let a = "Albania";
// // console.log(a.replace(/[a]/gi, ""));
// // console.log("Peter");

// // let str = "how to count letters in javascript.";
// // let letterCount = str.replace(/\s+/g, "").length;

// // console.log(letterCount); //30

// for (let i of countries) {
// 	// console.log(i);
// }

// function count(string) {
// 	var count = {};
// 	string.split("").forEach(function (s) {
// 		count[s] ? count[s]++ : (count[s] = 1);
// 	});
// 	return count;
// }

let newCount = ["Albania", "Bolivia", "Canada"];

for (let i of newCount) {
	let count = [];
	i.toLowerCase();
	let t = i.includes("an");

    const countriesContainingLand = countries.filter((country) =>
    country.includes('land')

	// .split("")
	// .forEach((word) => {
	// 	count[word] ? count[word]++ : (count[word] = 1);
	// });

	// count.includes((word) => {});
	// for (let k of count) {
	// 	console.log("checking");
	// }
}

// console.log("Peter");
// let letter = "Peter";
// letter.toLowerCase();

// console.log(letter.includes("e"));
