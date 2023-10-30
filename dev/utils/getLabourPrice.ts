import { getRandom } from './getRandom.js'

export const getLabourPrice = () => {
	const labourPrice: number = getRandom(21, 200)
	return labourPrice
}