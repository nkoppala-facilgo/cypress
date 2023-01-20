describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
          cy.fixture(`data/${data_path}/dashboard/check_labels_wo_by_priority_status_count_story/data`).then(function (data) {
                this.data = data;
          })
        });
        describe("filter Work Order By Priority Status Count Summary", function () {
                it("Work Order By Priority Status Count Summary : Verify user is able to filter Work Order by Asset group <smoke>", function() {
                        cy.execute('/script/dashboard/filter_wo_by_priority_status_count_story_by_asset_group',this.data)
                })
                it("Work Order By Priority Status Count Summary : Verify user is able to filter Work Order by Work Order Priority <smoke>", function() {
                        cy.visit()
                        cy.wait(5000)
                        cy.contains('strong','Work Order By Priority Status Count Summary').parent().parent().parent().find('u','All').eq(1).click()
                        cy.contains('All Selected').click().wait(2000).type(this.data['work_order_priority'][0]).get('.Select-menu-outer').type('{enter}')
                })
                it("Work Order By Priority Status Count Summary : Verify user is able to select more than 1 Work order Ptiority while filter. <smoke>", function() {
                        cy.visit()
                        cy.wait(5000)
                        cy.contains('strong','Work Order By Priority Status Count Summary').parent().parent().parent().find('u','All').eq(1).click()
                        for(let i=0;i<this.data.work_order_priority.length;i++)
                                cy.get('#tablePriorityStatusSumWO3').find('.Select-input input').click({ force: true }).wait(2000).type(this.data['work_order_priority'][i]).get('.Select-menu-outer').type('{enter}')
                })
               
        })
})