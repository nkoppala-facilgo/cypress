describe("Session Login ", () => {
        beforeEach(() => {
          var data_path = Cypress.env(`data`);
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
          });
          cy.fixture(`data/${data_path}/dashboard/check_label_supplier_follow_up/data`).then(function (data) {
                this.data = data;
          })
        });
        describe("Check labels on supplier follow up ", function () {
                it("Check labels on supplier follow up <smoke>", function() {
                        cy.visit()
                        cy.wait(7000)
                        cy.log('Row labels')
                        for(let i=0;i<this.data['row_labels'].length;i++){
                                cy.contains('div[class="table-sum-wo"]','Supplier Follow Up')
                                .find('.table_fixed_wo_count')
                                .contains(this.data.row_labels[i]).should('be.exist')
                        }
                        cy.log('Column labels')
                        for(let i=0;i<this.data['col_labels'].length;i++){
                                cy.contains('div[class="table-sum-wo"]','Supplier Follow Up')
                                .find('.table_fixed_wo_count')
                                .contains(this.data.col_labels[i]).should('be.exist')
                        }
                })

        })
}) 