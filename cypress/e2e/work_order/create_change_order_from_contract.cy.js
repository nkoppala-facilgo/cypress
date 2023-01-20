describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.supplier.username,data.supplier.password);
        });
        cy.fixture(`data/${data_path}/work_order/create_change_order_from_contract/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Create Change Order From Contract", function () {
        it("fc-4537 Supplier side: Create change order from from Contract", function () {
            const characters ='0123456789';
            function generateString(length) {
                let result = '';
                const charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                   result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                const common_str = Cypress.env(`common_string`);
               return common_str + result;
            }
            const wo_name = generateString(6);
            let str_name = wo_name + '34tgv343 updated 20220226'; 

            cy.visit('/contracts');
            cy.contains('Effective').eq(0).click({force:true});
            cy.wait(3000);
            cy.contains('button','Create Change Order').click({force:true});
            cy.wait(5000);
            cy.get('#change_order_change_order_title').clear().type(str_name);
            cy.execute('script/work_order/create_change_order_from_contract',this.data);
            cy.get('#change_order_supplier_change_order_number').click().type(wo_name);
            cy.get('#new_change_order > div.btn-toolbar.document-action-buttons > input').click({force:true});
            cy.get("#js-react-ChangeOrderItemsTable > table > tbody.table-body > tr > td.text-align-center.order-show.items-table__body--sku > p").click().wait(3000)
            cy.get("#js-react-ChangeOrderItemsTable > table > tbody.table-body > tr > td > table > tbody > tr:nth-child(6) > td:nth-child(2) > div:nth-child(2) > input").click().type(234).wait(4000)
            cy.get('.document-action-buttons').find('input').click({force:true});
            cy.wait(5000);
            cy.contains('Change Order was successfully created.').should('exist');    
        });  
    });
});
  