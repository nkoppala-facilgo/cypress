describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`);
          cy.log(data_path)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/dashboard/bulk_void_inspection/data`).then(function (data) {
            this.data = data;
          });
        });
        describe("upload quote template", function () {
                it("bulk void inspection <smoke>", function() {
                        cy.visit()
                        cy.wait(3000)
                        cy.contains("Bulk Void Inspection").dblclick({force:true})
                        cy.wait(40000)
                        cy.execute("/script/dashboard/bulk_void_inspection", this.data);
                        for(let i=1;i<=this.data.number_of_inspection;i++)
                                cy.get('[type="checkbox"]').eq(i).check({force: true})
                        cy.contains('button','Void Inspections').click({force:true})
                })
        })
})