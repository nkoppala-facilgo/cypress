describe('Session Login ',()=>{
        beforeEach(()=>{
            var data_path = Cypress.env("data");
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
            });
            cy.fixture(`data/${data_path}/dashboard/inspection_verify_graph_bar/data`).then(function (data) {
                  this.data = data;
            });
        })
        describe("Inspection:Dashboard", function () {
        it('To verify the Inspection graph count bar <smoke>', function () { 
            cy.visit('/dashboards/graph')
            cy.wait(4000)
            cy.get('#graph-inspection').contains('Inspections').should('exist')
            cy.wait(3000)
            cy.get('.svg-container-inspection > svg .main-g .bar-inspection').first().trigger('mouseover').get('.tooltipe').should('be.visible')
            cy.wait(3000)
                  var baseUrl= this.data.baseUrl
                  cy.window().then((win) => {
                        cy.stub(win, 'open', url => 
                        {
                        win.location.href =baseUrl;
                        }).as("popup")
                  })
                  cy.get("#graph-inspection .svg-container-inspection .main-g .bar-inspection").first().dblclick({force:true})
                  cy.on('uncaught:exception', (err, runnable) => { return false })
                  cy.get("@popup").should("be.called")
                  });
                       
            });
});