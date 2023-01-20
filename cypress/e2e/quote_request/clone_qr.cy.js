describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/quote_request/copy/data`).then(function (data) {
                        this.data = data;
                });
        });
      
        describe("Select a quote request and clone", function () {
                it("fc-2597 Select a quote request and clone <smoke>", function () {
                        cy.visit()
                        cy.contains('a','Documents').click({force:true})
                        cy.contains('a','Quotes / Contracts').click({force:true})
                        cy.contains('a','Quote Requests').click({force:true})
                        cy.get('div[data-react-class="QuoteRequestFilterModalToggle"]').find('i').click({force:true})
                        cy.wait(3000)
                        cy.select_by_label('Status(es):','Open',2000)
                        cy.contains('button','Search').click({force:true})
                        cy.get('div[id="scroll-search"]').find('li').first().find('a').first().click({force:true})
                        cy.wait(6000)
                        cy.contains('button','Copy').click({force:true})
                        cy.execute("/script/quote_request/copy", this.data);
                        cy.contains('button','Send').click({force:true})
                        cy.contains('Quote Request was successfully created.').should('be.exist')

                });
        });
});