describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspections/addedMappedItem/data`).then(function (data) {
        this.addedMappedItem_data = data;
        });
    })
    describe("PMC is able to Added Mapped Item Work Order/Quote Request/Budget/Catalog/Non-catalog with Inspection ", function() {
        it('FC-1447 PMC is able to Added Mapped Item "Work Order <smoke>', function() {
            cy.visit()
            const characters ='0123456789';
            function generateString(length) {
                    let result = "";
                    const charactersLength = characters.length;
                    for ( let i = 0; i < length; i++ ) {
                            result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    const common_str = Cypress.env(`common_string`);
               return common_str + result;
            }
            this.addedMappedItem_data['list_name'] = generateString(6);
            this.addedMappedItem_data['supplier_name'] = generateString(7);
            const character ='abcdefghijklmnopqrstuvxyz0123456789';
            function randomString(length) {
                    let result = "";
                    const charactersLength = characters.length;
                    for ( let i = 0; i < length; i++ ) {
                            result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    //const common_str = Cypress.env(`common_string`);
               return result;
            }
            cy.contains("Documents").click()
            cy.contains('a', 'Inspections').click({ force: true })
            cy.contains('a', 'Create Inspection').click({ force: true })
            cy.wait(3000)
            cy.execute('script/inspections/create', this.addedMappedItem_data)
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            this.addedMappedItem_data['supplier_email'] = randomString(5);
            
            cy.execute('script/inspections/addedMappedItem', this.addedMappedItem_data)
        });
    });
});

// {
//     "attribute": "due",
//     "expression":"cy.get('input[placeholder=\"Due Date\"]').parent().find('.input-group-addon').parent().parent().find('div.bootstrap-datetimepicker-widget.dropdown-menu.bottom.pull-right > ul > li > div > div > table > tbody').type(data['due'])",
//     "operation": ""
// },