describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc3.username,data.pmc3.password);
        });
        cy.fixture(`data/${data_path}/lease _audits/edit_audited_items/data`).then(function (data) {
            this.data = data;
        });
    });
  
    describe("Lease Audit Report", function () {
        it("fc-4092 Lease Audits Tab : Edit Audited Items is not working in prod.", function () {
            cy.visit();
            cy.wait(7000);
            cy.execute('script/lease _audits/edit_audited_items',this.data);
        });
    });
});
  