describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
})

describe("Check the count of the entries", function () {
 it('Check the count of the entries', function () { 
  cy.visit('/user_management')
   cy.wait(5000)
   cy.get('span[class="Select-arrow"]').click()
   cy.get('.Select-menu-outer').children().contains('20').click({force:true})
   cy.wait(3000)
   cy.get('table > tbody > tr').its('length').should('be.gt', 0)
  });
});
});
