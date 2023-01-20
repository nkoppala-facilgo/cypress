describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/matrices/action_edit_matrix/data`).then(function (data) {
            this.data = data;
        })
    });
  
    describe("Documents -> Project/Matrices -> Matrices", function () {
        it("fc-3856 Action Edit Matrix Button : Action-Edit the Matrix", function () {
            cy.execute('script/matrices/matrices_page',this.data);
            cy.goto_pagination_last_page('.pull-left','Last');
            cy.get(".matrices-view").find("tbody").find("tr").last().find("td").eq(1).invoke('text')
            .then(text => {
                cy.execute('script/matrices/action_edit_matrix',this.data);
                cy.get(".matrices-view").find("tbody").find("tr").last().find("td").eq(1).invoke('text')
                .then(text1 => {
                    expect(text).to.equal(text1);
                })
            })
        });
    });
});
  