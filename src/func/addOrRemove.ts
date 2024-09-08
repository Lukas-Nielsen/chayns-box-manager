export const addOrRemove = <T>(array: T[], value: T) => {
	const arr = [...array];
	const index = arr.indexOf(value);

	if (index === -1) {
		arr.push(value);
	} else {
		arr.splice(index, 1);
	}
	return arr;
};
