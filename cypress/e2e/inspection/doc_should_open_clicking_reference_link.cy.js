describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/doc_should_open_clicking_reference_link/data`).then(function(data) {
            this.data = data;
        });
    });
    describe("To verify related document should open after clicking on reference link on Inspection summary page", function() {
        it('FC-8159 Document should open after clicking on reference link on Inspection summary page <regression>', function() {
           cy.execute('script/inspection/doc_reference_links_appear_on_inspection_summary_page', this.data);
           cy.visit("/inspections");
           cy.wait(4000);
           cy.get(".fa-filter").click();
           cy.select_by_label("Inspection Title(s):", this.data.inspection_title );
           cy.contains("button", "Search").click({force: true});
           cy.get('div[id="document-scroll-search"]').find("li").first().click({force: true});
           cy.contains('label', 'Show More').click({force: true});
           cy.get('p > .text-blue').click({force: true});
        });
    });
});
