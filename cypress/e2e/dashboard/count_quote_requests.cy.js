describe('Session Login ',()=>{
        beforeEach(()=>{
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
              });
          })
          describe("Count Quote Requests", function () {
                it("Count Quote Requests <smoke>", function() {
                        cy.visit()
                        cy.wait(3000)
                        cy.get('div[class="btn-document-content"]').contains("Quote Requests")
                        .parent().find('small')
                        .invoke('text')
                        .then(text => {
                                cy.get('div[class="btn-document-content"]').contains("Quote Requests").dblclick({force:true})
                                cy.wait(25000)
                                if(Number(text) < 20){
                                        cy.get('div[id="scroll-search"]').find('li')
                                        .should('have.length', Number(text))
                                }
                                else {
                                        function countItems(){
                                                cy.get('#scroll-search').scrollTo('0%', '100%')
                                                cy.wait(2000)
                                                cy.get('div[class="error-message"]').find('span')
                                                .invoke('text')
                                                .then(message => {
                                                        if(message === "No More data!"){
                                                                cy.wait(3000)
                                                                cy.get('div[id="scroll-search"]')
                                                                .find('li').should('have.length', Number(text))
                                                        }
                                                        else {
                                                                countItems()
                                                        }
                                                })
                                        }
                                        countItems()
                                }
                        })
                })
        })
})         