describe('Session Login ',()=>{
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.supplier.username,data.supplier.password);
            });
            cy.fixture(`data/${data_path}/quotes/pmc_accept_sign/data`).then(function(data) {
                this.pmc_accept_sign_data = data;
            })
        }) 
        describe(" pmc accept and sign quotes", function() {
            it('fc-2885 pmc accepting and signing new quotes', function() {
                cy.visit()
                cy.wait(5000)
                cy.get('.icon-menu-work-order').click()
                cy.wait(5000)
                cy.get('a[href=\"/quotes/new\"]').click({ force: true })
                cy.wait(3000)
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.execute('script/quotes/create', this.pmc_accept_sign_data)
                cy.wait(2000)
                cy.get('.btn-show-quote').first().click({force:true})
                cy.wait(6000)
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
                        cy.execute('script/quotes/pmc_accept_sign', this.pmc_accept_sign_data)
                });
            });
        });
});