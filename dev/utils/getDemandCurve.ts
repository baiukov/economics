import { getRandom } from './getRandom.js'

export const getDemandCurve = () => {
	const demandC: number = getRandom(11, 100)
	const demandK: number = getRandom(-10, -1)
	return [demandC, demandK]
}