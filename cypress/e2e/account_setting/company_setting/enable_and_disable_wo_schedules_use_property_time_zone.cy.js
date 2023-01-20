describe('Session Login ',()=>{
        beforeEach(() => {
              var data_path = Cypress.env(`data`)
              cy.fixture(`data/${data_path}/login/data`).then(function (data) {
              cy.login_with_session(data.pmc.username,data.pmc.password);
              });
            })
        describe("select different option for 'Work Order Schedules Use Property Time Zone'", function() {
            it("fc-3920 disable the 'Work Order Schedules Use Property Time Zone'", function() {
                cy.visit()
                cy.wait(3000)
                cy.get('span[class=caret]').first().click({force:true})  
                cy.contains('Account Settings').click({force:true})
                cy.contains('Company Settings').click({force:true})
                cy.get('[id="company_company_setting_attributes_is_work_order_schedules_use_property_time_zone"]').select("Disabled")
                cy.get('input[id="saveButton"]').click({force:true})
                cy.contains("Your settings has been saved.").should("be.exist")
            });
            it("fc-3919 enable the 'Work Order Schedules Use Property Time Zone'", function() {
                cy.visit()
                cy.wait(3000)
                cy.get('span[class=caret]').first().click({force:true})  
                cy.contains('Account Settings').click({force:true})
                cy.contains('Company Settings').click({force:true})
                cy.get('[id="company_company_setting_attributes_is_work_order_schedules_use_property_time_zone"]').select("Enabled")
                cy.get('input[id="saveButton"]').click({force:true})
                cy.contains("Your settings has been saved.").should("be.exist")
            });
        });
    });