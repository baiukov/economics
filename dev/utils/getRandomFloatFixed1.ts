export const getRandomFloatFixed1 = (max: number = 0, min: number = 0) => {
	return parseFloat((Math.random() * (max - min) + min).toFixed(1))
}