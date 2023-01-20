describe('Session Login ',()=>{
        beforeEach(()=>{
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
              });
          })
          describe("Count Quotes", function () {
                it("Count Quotes <smoke>", function() {
                        cy.visit()
                        cy.wait(3000)
                        cy.get('div[class="btn-document-content"]').contains("Approvals").dblclick({force:true})
                        cy.url().should('eq', 'https://staging.facilgo.com/document_approval_logs')
                })
        })
})         