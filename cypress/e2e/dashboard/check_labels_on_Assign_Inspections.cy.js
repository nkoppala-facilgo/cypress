describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
          });
          cy.fixture(`data/${data_path}/dashboard/check_labels_on_Assign_Inspection/data`).then(function (data) {
                this.data = data;
          });
        });
        describe("Check labels on Assign Inspection", function () {
                it("Check labels on Assign Inspection <smoke>", function() {
                        cy.visit()
                        cy.wait(7000)
                        var jsonData = this.data;
                        Object.keys(this.data).forEach(tab => {
                                cy.get('div[class="assign-inspection"]').find('a').contains(tab).click({force:true})
                                for(let i=0;i<jsonData[tab].length;i++){
                                        cy.get('div[class="assign-inspection"]').find('tr').contains(jsonData[tab][i]).should('be.exist')    
                                }
                                cy.wait(3000)
                        })
                })              

        })
}) 