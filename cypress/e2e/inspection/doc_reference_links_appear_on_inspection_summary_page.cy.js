describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/doc_reference_links_appear_on_inspection_summary_page/data`).then(function(data) {
            this.data = data;
        })
    });
    describe("Verify related document reference links are appear on Inspection summary page", function() {
        it('FC-8160 Reference links are appear on Inspection summary page. <regression>', function() {
            cy.execute('script/inspection/doc_reference_links_appear_on_inspection_summary_page', this.data);
           cy.visit("/inspections");
           cy.get(".fa-filter").click();
           cy.select_by_label("Inspection Title(s):",this.data.inspection_title );
           cy.contains("button", "Search").click({force: true});
           cy.get('div[id="document-scroll-search"]').find("li").first().click({force: true});
           cy.contains('label', 'Show More').click({force: true})
        });
    });
});
