const a = ["Apple", "Banana", "Canana", "Game"];

for (let i of a) {
	console.log(i);
	let k = [];

	i.split("").forEach((j) => {
		k[j] ? k[j]++ : (k[j] = 1);
	});
	console.log(k);
}
