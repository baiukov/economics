export const getRandomFloat = (max: number = 0, min: number = 0) => {
	return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}