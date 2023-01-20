describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/dashboard/check_labels_wo_by_priority_status_count_story/data`).then(function (data) {
                this.data = data;
          })
        });
        describe("Check labels on Work Order By Priority Status Count Summary ", function () {
                it("Check labels <smoke>", function() {
                        cy.visit()
                        cy.wait(7000)
                        for(let i=0;i<this.data['labels'].length;i++){
                                cy.contains('div[class="table-sum-wo"]','Work Order By Priority Status Count Summary')
                                .find('.wo_count_summary_table')
                                .contains(this.data.labels[i]).should('be.exist')
                        }
                })
               
        })
})