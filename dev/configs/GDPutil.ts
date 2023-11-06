export const costsMethodElements = {
	costs: "spotřební výdaje domácností",
	investments: {
		net: "čisté soukromé domácí investice",
		gross: "hrubé soukromé domácí investice",
		amortizations: [
			"odpisy",
			"amortizace kapitálu"
		],
	},
	government: "vládní nákupy statků a služeb",
	netExport: {
		netExport: "čistý export",
		grossExport: {
			import: "import",
			export: "export"
		}
	}
}

export const incomeMethodElements = {
	salaries: "mzdy",
	incomes: "zisky",
	interests: "úroky z úvěrů",
	rents: "renty",
	amortizations: [
		"odpisy",
		"amortizace kapitálu"
	],
	taxes: {
		netTaxes: "nepřímé daně minus subvence (dotace)",
		grossTaxes: {
			name: "nepřímé daně",
			transfers: [
				"dotace",
				"subvence",
				"dotace na produkty"
			]
		}
	}
}