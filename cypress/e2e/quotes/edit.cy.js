describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.supplier.username,data.supplier.password);
            });
            cy.fixture(`data/${data_path}/quotes/edit/data`).then(function(data) {
                this.edit_data = data;
            })
        }) 
        describe(" edit quotes", function() {
            it('fc-2883 editing new quotes', function() {
                cy.visit()
                cy.wait(5000)
                cy.get('.icon-menu-work-order').click()
                cy.wait(5000)
                cy.get('a[href=\"/quotes/new\"]').click({ force: true })
                cy.wait(3000)
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.execute('script/quotes/create', this.edit_data)
                cy.wait(2000)
                cy.execute('script/quotes/edit', this.edit_data)
                cy.wait(4000)
                cy.contains('label','QU#:').parent().find('p')
                .invoke('text')
                .then(Q_number => {
                        cy.get('span[class=caret]').eq(0).click({force:true})  
                        cy.contains('Logout').click({force:true})
                        cy.wait(3000) 
                        var data_path = Cypress.env(`data`)
                        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                            cy.login_with_session(data.pmc.username,data.pmc.password);
                        });
                        cy.visit("/quotes/"+Q_number)
                });
            });
        });
});