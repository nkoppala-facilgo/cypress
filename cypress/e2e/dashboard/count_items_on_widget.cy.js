describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/dashboard/add_widget/data`).then(function (data) {
                this.data = data;
          })
        });
        describe("count items on widget ", function () {
                it("count items on widget <smoke>", function() {
                        cy.verify_count_on_widget("maintenanceManagerActionItems")
                })
                it("count items on widget ", function() {
                        cy.verify_count_on_widget("fieldAdminActionItems")
                })
        })
})