import { costsMethodElements } from '../configs/GDPutil.js'
import { getRandom } from './getRandom.js'
import { shuffle } from './shuffle.js'

export const getCostsMethod = () => {
	let elements: Array<Record<string, number | string>> = []
	let GDP: number = 0

	const costsValue = getRandom(2000, 100)
	elements.push(
		{
			name: costsMethodElements.costs,
			value: costsValue
		}
	)
	GDP += costsValue

	const isInvesmentsGross = getRandom(0, 99) < 50
	const investmentsObject = costsMethodElements.investments
	const investmentsValue = getRandom(100, 1000)
	elements.push(
		{
			name: isInvesmentsGross ? investmentsObject.gross : investmentsObject.net,
			value: investmentsValue
		}
	)
	const amortizatiionValue = getRandom(1001, 100)
	elements.push(
		{
			name: investmentsObject.amortizations[getRandom(investmentsObject.amortizations.length - 1, 0)],
			value: amortizatiionValue
		}
	)
	GDP += isInvesmentsGross ? investmentsValue : (investmentsValue + amortizatiionValue)

	const governmentCosts = getRandom(500, 3000)
	elements.push(
		{
			name: costsMethodElements.government,
			value: governmentCosts
		}
	)
	GDP += governmentCosts

	const isNetExport = getRandom(0, 99) < 50
	if (isNetExport) {
		const netExport = getRandom(-500, 500)
		elements.push(
			{
				name: costsMethodElements.netExport.netExport,
				value: netExport
			}
		)
		GDP += netExport
	} else {
		const importValue = getRandom(100, 500)
		const exportValue = getRandom(100, 500)
		elements.push(
			{
				name: costsMethodElements.netExport.grossExport.export,
				value: exportValue
			},
			{
				name: costsMethodElements.netExport.grossExport.import,
				value: importValue
			}
		)
		GDP += (exportValue - importValue)
	}

	const amountAnother = getRandom(3, 0)
	const another = ["mzdy", "zisky", "úroky z úvěrů", "renty",]
	for (let i = 0; i < amountAnother; i++) {
		const index = getRandom(another.length - 1, 0)
		elements.push(
			{
				name: another[index],
				value: getRandom(100, 500)
			}
		)
		another.splice(index, 1)
	}

	let taskString = "V dané ekonomice vypočtěte HDP vhodnou metodou (údaje v mil. Kč)<br>"
	elements = shuffle(elements)
	elements.forEach((element) => {
		taskString += `${element.name} ${element.value}; `
	})
	return [taskString, GDP]
}