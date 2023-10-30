export const getRandom = (max: number = 0, min: number = 0) => {
	return Math.round((Math.random() * (max - min) + min))
}