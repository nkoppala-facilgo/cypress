
describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/work_order/void_quote_request_at_heirarchy_table/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Void Quote Request at WO document hierarchy table at PMC side.", function () {
    it("fc-4378 Void Quote Request at WO document hierarchy table at PMC side <smoke>", function () {
      cy.visit("/dashboards/graph");
      cy.contains("Documents").click();
      cy.contains("a", "Work Orders").click({ force: true });
      cy.wait(6000);
      cy.reload();
      cy.get(".fa-filter").click();
      cy.select_by_label_with_enter('Status(es):',this.data['status1'],1500);
      cy.contains('button','Search').click()
      cy.wait(5000);
      cy.get(".media").first().click();
      cy.wait(4000);
      cy.contains('label','WO#:').parent().find('p')
      .invoke('text')
      .then(wo_number => {
            cy.get(".media").first().click();
            cy.wait(4000);
            cy.get(" #js-react-WorkOrderDocumentHierarchyView  button").first().click();
            // cy.get("body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button").click();
            this.data.wo_number=wo_number
            cy.contains("Are you sure you want to void the order?").should("exist");
            cy.get(".confirm").contains('button','Yes').click();
            cy.wait(2000)
            cy.reload();
            cy.get(".fa-filter").click();
            cy.select_by_label_with_enter("WO#(s)", this.data["wo_number"], 1500);
            cy.contains("button", "Search").click();
        })
    });
  });
});
describe('Session Login ',()=>{
        beforeEach(() => {
             var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
         cy.fixture(`data/${data_path}/work_order/void_quote_request_at_heirarchy_table/data`).then(function (data) {
            this.data = data;
         })     
     })
     describe("Void Quote Request at WO document hierarchy table at PMC side.", function () {
      it(' FC-4378 Void Quote Request at WO document hierarchy table at PMC side <smoke>', function () { 
           cy.visit("/dashboards/graph")
           cy.contains("Documents").click()
           cy.contains('a','Work Orders').click({ force: true })
           cy.wait(6000);
           cy.reload();
           cy.get('.fa-filter').click()
           cy.select_by_label_with_enter('Status(es):',this.data['status'],1500);
           cy.contains('button','Search').click()
           cy.wait(5000);
           cy.get('.media').first().click();
           cy.wait(5000);
           cy.contains('label','WO#:').parent().find('p')
           .invoke('text')
           .then(wo_number => {
               cy.get('.document-action-buttons .btn-danger').last().contains('Void').click();
               cy.get('.Select-arrow-zone').click()
               cy.select_by_placeholder_with_enter('Reason:',this.data.reason,4000)
               cy.wait(2000)
               cy.get('.modal-footer  .btn-primary').contains('Save').click()  
               cy.contains('Are you sure?').should('exist') 
               cy.wait(2000)
               cy.get('.confirm').contains('button','Yes').click()  
               cy.wait(4000)
               cy.reload();
               this.data.wo_number=wo_number
               
               cy.get('.fa-filter').click()
               cy.wait(2000)
               cy.select_by_label_with_enter('WO#(s)',this.data['wo_number'],2600);
               cy.contains('button','Search').click()
        })
       });
     });
     });
