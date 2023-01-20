describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env("data");
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.newpmc.username,data.newpmc.password);
                });
                cy.fixture(`data/${data_path}/register_pmc/setup_fiscal_calendar/data`).then(function (data) {
                        this.data = data;
                });
              
        }) 
        
      describe("new pmc ", function () {
       it('fc-5178 Setup Fiscal Calendar', function () { 
               cy.visit()
               cy.wait(4000)
               cy.get('.icon-menu-settings').click()
               cy.contains('a','Chart of Accounts').click()
               cy.contains('a','Fiscal Calendars').click()
               cy.wait(3000)
               const characters ='0123456789';
               function generateString(length) {
                   let result = ' ';
                   const charactersLength = characters.length;
                   for ( let i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                   }
                   const common_str = Cypress.env(`common_string`);
                   return common_str + result;
               }
               this.data['fiscal_calendar_name'] = generateString(7);
               cy.contains('button','New Fiscal Calendar').click()
               cy.wait(3000)
               cy.execute('/script/register_pmc/setup_fiscal_calendar',this.data) 
               cy.wait(2000)
               cy.contains('Fiscal Periods Successfully Saved!').should('exist')
               

        });
  });
});
