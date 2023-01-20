describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then((data) => {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/pmc_document_hierarchy/data`).then(function(data) {
            this.pmc_document_hierarchy_data = data;
        })
    })

    describe("PMC side- Document Hierarchy ", function() {
        it('FC-1280 Verifying PMC side- Document Hierarchy  <smoke>', function() {
            cy.visit();
            cy.wait(5000);
            cy.contains("Documents").click()
            cy.contains('a', 'Work Orders').click({ force: true })
            cy.wait(3000)
            cy.execute('/script/work_order/pmc_document_hierarchy', this.pmc_document_hierarchy_data)
        });
    });
})