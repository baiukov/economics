import { getRandom } from './getRandom.js'

export const getTotalProductCurve = () => {
	const productionK1: number = getRandom(11, 100)
	const productionK2: number = getRandom(-0.1, -3)
	return [productionK1, productionK2]
}