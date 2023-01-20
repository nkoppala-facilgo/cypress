describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.pmc.username,data.pmc.password);
         });
   cy.fixture(`data/${data_path}/quote_request/create/non-registered/data`).then(function (data) {
      this.data = data;
   });
   cy.fixture(`data/${data_path}/quote_request/create/registered/data`).then(function (data) {
      this.data1 = data;
    });
   cy.fixture(`data/${data_path}/quote_request/create/reg_nonreg/data`).then(function (data) {
      this.data2 = data;
   })
});
describe("Create a quote request", function () {
   it('create a quote request with Non-Registered Supplier <smoke>', function () { 
      cy.visit()
      //cy.get('[data-original-title="Begin work menu"]').click()
      cy.get('.icon-menu-work-order').click()
      //cy.get('[data-title="Create Quote Requests"]').click()
      cy.contains('Create Quote Requests').click()
      cy.wait(3000)
      cy.execute('/script/quote_request/create',this.data)
  });
   it('create a quote request with Registered Supplier', function () { 
      cy.visit()
      cy.get('.icon-menu-work-order').click()
      cy.contains('Create Quote Requests').click()
      cy.wait(3000)
      cy.execute('/script/quote_request/create',this.data1)
   });
   it('create a quote request with Registered as well as with Non-Registered Supplier', function () { 
      cy.visit()
      cy.get('.icon-menu-work-order').click()
      cy.contains('Create Quote Requests').click()
      cy.wait(3000)
      cy.execute('/script/quote_request/create',this.data2)   
   });
});
});
