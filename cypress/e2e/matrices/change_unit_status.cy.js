describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc2.username,data.pmc2.password);
        });
        cy.fixture(`data/${data_path}/matrices/change_unit_status/data`).then(function (data) {
            this.data = data;
        })
    });
  
    describe("Documents -> Project/Matrices -> Matrices", function () {
        it("fc-3871 Unit Status Button : To Verify User can change the unit status from Matrices filter page <smoke>", function () {
            cy.execute('script/matrices/matrices_page',this.data);
            cy.execute('script/matrices/change_unit_status',this.data); 
        });
    });
});
  
  