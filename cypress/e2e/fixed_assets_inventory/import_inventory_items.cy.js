describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
          });
          cy.fixture(`data/${data_path}/fixed_assets_inventory/import_inventory_items/data`).then(function (data) {
            this.data = data;
          });
        });
    describe("Import Inventory items.", function () {
      it("Fc-1191 Cypress Automation || Import Inventory items. <smoke> ", function () {
        cy.visit("/inventory_items");
        cy.wait(4000);
        cy.contains('button','Import').click()
        cy.wait(3000);
        cy.get('input[accept=\".xlsx\"]').attachFile(this.data['file_path'])
        cy.wait(2000)
        cy.get('.modal-footer  .btn-primary').contains('button','Import').click({force: true})
        cy.wait(2000)
        cy.contains('Imported').should('exist')
      });
    });
  });
      