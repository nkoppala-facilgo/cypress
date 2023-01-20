describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
            })
        describe("Redirect to task assignment page", function() {
            it("Redirect to task assignment page <smoke>", function() {
                cy.visit()
                cy.wait(3000)
                cy.get('i[title="Go to the Task Assignment"]').parent().click({force:true})
                cy.contains("Task Assignments").should("be.exist")
            });
        });
    });