describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
          });
          cy.fixture(`data/${data_path}/setup/properties/update_units/data`).then(function (data) {
              this.data = data;
            }
          );
        });
        describe("Setup - Properties", function () {
          it("FC-6034  User able to Update units", function () {
                cy.visit();
                cy.on('uncaught:exception', (err, runnable) => {return false;});
                cy.visit("/properties");
                cy.wait(4000);
                cy.on('uncaught:exception', (err, runnable) => {return false;});
                cy.contains('button','Update Units').click();
                cy.get('input[type=\"file\"]').eq(1).attachFile(this.data['file_path'])
                cy.get('.modal-footer .btn-primary').eq(1).click();
          });
        });
      });
