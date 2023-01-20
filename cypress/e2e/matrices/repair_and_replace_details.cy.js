
  describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/matrices/repair_and_replace_details/data`).then(function (data) {
            this.data = data;
        })
    });
    describe("Documents -> Project/Matrices -> Matrices", function () {
      it("fc-3869 Repair And Replace Details Dropdown Value : To Verify Repair And Replace Details from Matrices filter page <smoke>", function () {
        cy.execute('script/matrices/matrices_page',this.data);
        cy.select_by_placeholder('Matrices',this.data.Matrix_Name);
        cy.wait(5000);
        cy.execute('script/matrices/repair_and_replace_details',this.data);
      });
    });
});
  
