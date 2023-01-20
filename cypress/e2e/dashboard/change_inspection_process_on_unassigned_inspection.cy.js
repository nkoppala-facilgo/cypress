describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
          });
          cy.fixture(`data/${data_path}/dashboard/change_inspection_process_on_unassigned_inspection/data`).then(function (data) {
                this.data = data;
          });
        });
        describe("To Verify user can chage the inspection process.", function () {
                it("To Verify user can chage the inspection process. <smoke>", function() {
                        cy.visit()
                        cy.wait(7000)
                        cy.get('div[class="assign-inspection"]').find('a').contains('Unassigned').click({force:true})
                        cy.get('#assign-inspection-tab').find('tr').eq(1).find(`.Select-input input`).click({ force: true }).type(this.data.assignee, { force: true });
                        cy.get(`[class*="-menu-outer"]`).contains(this.data.assignee).click({ force: true });
                        cy.get('#assign-inspection-tab').find('tr').eq(1).find('td').eq(2).find(`input`).click({ force: true }).clear().type(this.data.due_date, { force: true });
                        cy.get('#assign-inspection-tab').find('tr').eq(1).find('td').eq(2).find(`input`).parent().find(`.input-group-addon`).click({ force: true });
                        cy.get('.assign-inspection').find('button').contains('Process Changes').click({force:true})
                        cy.wait(3000)
                        cy.contains('button','Yes').click({force:true})
                        cy.contains('Inspections were saved successfully').should('be.exist')
                })              

        })
}) 