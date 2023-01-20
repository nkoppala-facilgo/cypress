describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/quote_request/check_duplicate_sku/data`).then(function (
            data
          ) {
            this.data = data;
          });
        });
describe("Check Duplicate Supplier", function () {
    it('fc-1417 Restrict the duplicate supplier <smoke>', function () { 
        cy.visit("/quote_requests/new");
        cy.wait(3000)
        cy.contains('button','Invite Supplier').click({force: true})
        cy.select_by_typeahead('input#supplier-name',this.data['supplier'])
        cy.contains('button','Invite Supplier').click({force: true})
        cy.get('input#supplier-name').type(this.data['supplier'],{ force: true });
        cy.wait(3000)
        cy.get('div.modal-body').should('exist') 
    });
});
});
