describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/register_pmc/register/data`).then(function (data) {
                        this.data = data;
                      });
              
        }) 
      describe("new pmc ", function () {
       it('fc-5170 Register a new PMC for free', function () { 
               cy.visit()
               cy.visit('/facilgo_plans/pmc')
               cy.wait(4000)
               cy.contains('a','Sign Up for Setup Only').click()
               cy.execute('/script/register_pmc/register',this.data) 
               cy.get('iframe')
                .then(($iframe) => {
                        const $body = $iframe.contents().find('body')
                        cy.wrap($body)
                        .find('a').contains('Confirm my account')
                        .invoke('attr', 'href')
                        .then(myLink => {
                                cy.forceVisit(myLink);
                                cy.on('uncaught:exception', (err, runnable) => { return false })
                                
                                })
                        })
                   
                cy.wait(3000)
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.newpmc.username,data.newpmc.password); 
                });
                cy.visit()
                cy.wait(4000)
                cy.get('span[class=caret]').eq(0).click({force:true})  
                cy.contains('Account Settings').click({force:true})
                cy.wait(3000)
                cy.get('#account-subscription-link').contains('Subscription').click()
                cy.wait(4000)
                cy.get('.btn-subscription-types').contains('Subscription Types and Fees').click()
                cy.get('.register-plan').contains('Monthly Subscription').eq(1).click()

                cy.get('input[placeholder=\"Coupon Code (if you have one)\"]').type(this.data.coupon_code)
                cy.get('.btn-primary').click()
                cy.contains('Are you sure?').should('exist')
                cy.contains('button','OK').click()
        });
});
});