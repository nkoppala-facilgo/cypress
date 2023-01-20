describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/dashboard/filter_wo_summary_by_supplier/data`).then(function (data) {
                this.data = data;
          })
        });
        describe("filter by asset groups work_order by supplier", function () {
                it("filter by asset groups work_order by supplier <smoke>", function() {
                        cy.execute('/script/dashboard/filter_wo_summary_by_supplier',this.data)
                })
               
        })
})