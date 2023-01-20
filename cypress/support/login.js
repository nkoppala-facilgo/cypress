import LoginPage from '../page_object_models/login_page'
import Constants from '../constants'

Cypress.Commands.add("login", (data, type) => {
    
    const loginPage = new LoginPage()

    loginPage.getUserName().type(data.pmc.username)
    loginPage.getPassword().type(data.pmc.password) 
    loginPage.getSignInButton().click()    

});