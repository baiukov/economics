export const getZStr = (num: number) => {
	return num < 0 ? "- " + -num : "+ " + num
}