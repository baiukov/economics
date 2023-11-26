import { costsMethodElements, incomeMethodElements } from '../configs/GDPutil.js'
import { getRandom } from './getRandom.js'
import { shuffle } from './shuffle.js'

export const getIncomeMetod = () => {
	let elements: Array<Record<string, number | string>> = []
	let GDP: number = 0

	const salariesValue = getRandom(2000, 100)
	elements.push(
		{
			name: incomeMethodElements.salaries,
			value: salariesValue
		}
	)
	GDP += salariesValue

	const incomesValue = getRandom(500, 100)
	elements.push(
		{
			name: incomeMethodElements.incomes,
			value: incomesValue
		}
	)
	GDP += incomesValue


	const interestsValue = getRandom(300, 100)
	elements.push(
		{
			name: incomeMethodElements.interests,
			value: interestsValue
		}
	)
	GDP += interestsValue


	const rentsValue = getRandom(300, 100)
	elements.push(
		{
			name: incomeMethodElements.rents,
			value: rentsValue
		}
	)
	GDP += rentsValue


	const amortizatiionValue = getRandom(500, 100)
	elements.push(
		{
			name: incomeMethodElements.amortizations[
				getRandom(
					incomeMethodElements.amortizations.length - 1,
					0
				)
			],
			value: amortizatiionValue
		}
	)
	GDP += amortizatiionValue


	const isNetTaxes = getRandom(0, 99) < 50
	if (isNetTaxes) {
		const taxesValue = getRandom(500, 100)
		elements.push(
			{
				name: incomeMethodElements.taxes.netTaxes,
				value: taxesValue
			}
		)
		GDP += taxesValue

	} else {
		const taxesValue = getRandom(500, 100)
		const subvence = getRandom(taxesValue, 99)
		const transfers = incomeMethodElements.taxes.grossTaxes.transfers
		elements.push(
			{
				name: incomeMethodElements.taxes.grossTaxes.name,
				value: taxesValue
			},
			{
				name: transfers[getRandom(transfers.length - 1, 0)],
				value: subvence
			}
		)
		GDP += (taxesValue - subvence)

	}

	const amountAnother = getRandom(5, 3)
	const another = [
		costsMethodElements.costs,
		costsMethodElements.government,
		costsMethodElements.investments.gross,
		costsMethodElements.investments.net,
		costsMethodElements.netExport.netExport,
		costsMethodElements.netExport.grossExport.export,
		costsMethodElements.netExport.grossExport.import,
	]
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
