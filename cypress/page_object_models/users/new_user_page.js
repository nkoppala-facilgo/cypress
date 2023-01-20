import Page from '../page'

class NewUserPage extends Page {

    constructor() {
        super()
        this.email = "input[id=userEmail]";
        this.user_type = ".react-single-select";
        this.first_name = "input[id=userFirstName]";
        this.last_name = "input[id=userLastName]";
        this.submit_btn = "Submit";
    }

    getEmail() {
        return this.get(this.email);
    }

    getUserType(ut) {
        return this.getByLabelSelect("User Type", ut)
    }

    getFirstName() {
        return cy.now("get", this.first_name)
    }

    getLastName() {
        return this.get(this.last_name);
    }

    getSubmitButton() {
        return this.getByContains(this.submit_btn)
    }

}
export default NewUserPage
