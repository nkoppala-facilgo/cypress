import UserPage from '../page_object_models/users/new_user_page'
import Constants from '../constants'

Cypress.Commands.add("create_user", (data) => {
    
    const userPage = new UserPage()

    userPage.getEmail().type(data.email)
    cy.wrap(userPage.getFirstName()).type(data.first_name) 
    userPage.getLastName().type(data.last_name) 
    userPage.getUserType(data.user_type, {force: true})    
    userPage.getSubmitButton().click()    

});