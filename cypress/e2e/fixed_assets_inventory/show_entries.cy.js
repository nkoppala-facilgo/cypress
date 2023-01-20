describe('Session Login ',()=>{
        beforeEach(()=>{
            var data_path = Cypress.env("data");
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
            });
           
        })
        describe("To show fixed assets inventory items entries in one page", function() {
            it("FC-1171 To show fixed assets inventory items entries in one page <smoke>", function() {
                cy.visit()
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.contains('a','Fixed Assets/Inventory').click()
                cy.visit('/fixed_asset_items')
                cy.wait(3000)
                cy.on('uncaught:exception', (err, runnable) => { return false })
                cy.get('.Select-arrow-zone .Select-arrow').click()
                cy.wait(3000)
                cy.get('.Select-menu-outer').click()
            });
        });
});