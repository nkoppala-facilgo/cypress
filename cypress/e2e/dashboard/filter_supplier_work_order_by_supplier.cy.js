describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/dashboard/filter_supplier_work_order_by_supplier/data`).then(function (data) {
                this.data = data;
          })
        });
        describe("filter by asset groups work_order by supplier", function () {
                it("Work Order Summary By Suppliers : Verify user is able to filter Supplier by Supplier type <smoke>", function() {
                        cy.execute('/script/dashboard/filter_supplier_work_order_by_supplier',this.data)
                })
               
        })
})