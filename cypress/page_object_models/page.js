class Page {

	constructor() {

	}

	get(value) {
        return cy.get(value);
    }

    getByXPath(value) {
        return cy.xpath(value);
    }

    getByContains(value) {
    	return cy.contains(value)
    }

    getByLabelSelect(label, value) {
    	return cy.chooseReactSelectOption(label, value)
    }
}
export default Page