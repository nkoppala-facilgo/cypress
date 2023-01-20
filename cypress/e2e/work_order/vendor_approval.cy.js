describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.technician1.username,data.technician1.password);
          cy.on('uncaught:exception', (err, runnable) => { return false })
          });
          cy.fixture(`data/${data_path}/work_order/vendor_approval/data`).then(function (data) {
            this.data = data;
          })
      })
    describe("Automatically send work to Vendor once NTE workflow is approved", function() {
        it('fc-6827 Automatically send work to Vendor once NTE workflow is approved <smoke>', function() {
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains("Documents").click();
            cy.contains("a", "Work Orders").click({ force: true });
            cy.wait(4000)
            cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true})
            cy.wait(4000)   
            cy.select_by_label_with_enter('Supplier(s):',this.data.supplier_name,4000) 
            cy.select_by_label_with_enter('Status(es):',this.data.status,2000) 
            cy.wait(4000)
            cy.get('.modal-footer').contains('Search').click()
            cy.wait(9000)
            cy.get('.btn-show-work-order').first().click()
            cy.wait(4000)
            cy.contains('label','WO#:').parent().find('p')
            .invoke('text')
            .then(wo_number => {
                cy.wait(4000);
                this.data.wo_number=wo_number
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.supplier.username,data.supplier.password);
                });
                cy.visit()
                cy.wait(3000)
                cy.contains("Documents").click();
                cy.contains("a", "Work Orders").click({ force: true });
                cy.wait(4000)
                cy.get('#js-react-NewWorkOrderFilterModalToggle').find('i').click({force: true})
                cy.wait(4000)   
                cy.select_by_label_with_enter('WO#(s):',this.data.wo_number,3000) 
                cy.get('.modal-footer').contains('Search').click()
                cy.wait(4000)
                cy.get('.btn-show-work-order').first().click()
                cy.wait(4000)
              })
        });
    });
});
