
describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/cancel_order/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("Cancel Order from PMC side", function () {
    it("fc-4397 cancel_order", function () {
      cy.visit();
      cy.contains("Documents").click();
      cy.contains("a", "Work Orders").click({ force: true });
      cy.wait(7000);
      cy.execute("/script/work_order/filter", this.data);
      cy.wait(4000);
      cy.get(".media").first().click();
      cy.wait(8000);
      cy.get("#js-react-WorkOrderDocumentHierarchyView")
        .find(".btn-danger")
        .last()
        .contains("Void")
        .click();
      cy.get(
        "div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button"
      ).click();
    });
  });
});
describe('Session Login ',()=>{
        beforeEach(() => {
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/work_order/cancel_order/data`).then(function (data) {
                        this.data = data;
                })
        })
        describe("Cancel Order from PMC side", function () {
                it('FC-4397 cancel_order', function () { 
                        cy.visit();
                        cy.contains('Documents').click();
                        cy.contains('a','Work Orders').click({ force: true })
                        cy.wait(7000);
                        cy.execute('/script/work_order/filter',this.data)
                        cy.wait(4000)
                        cy.get('.media').first().click()
                        cy.wait(8000)
                        cy.get('.document-action-buttons .btn-danger').contains('Void').click();
                        cy.get('.Select-arrow-zone').click()
                        cy.select_by_placeholder_with_enter('Reason:',this.data.reason,4000)
                        cy.wait(2000)
                        cy.get('.modal-footer  .btn-primary').contains('Save').click()  
                        cy.contains('Are you sure?').should('exist') 
                        cy.wait(2000)
                        cy.get('.confirm').contains('button','Yes').click()   
                });
        });
});
