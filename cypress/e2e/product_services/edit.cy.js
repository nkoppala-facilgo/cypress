describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.supplier.username,data.supplier.password);
          });
        cy.fixture(`data/${data_path}/product_services/edit/data`).then(function(data) {
            this.edit_data = data;
        })
    })

    describe("To verify that Supplier is able to Edit created Product.", function() {
        it('FC-2559 To verify that Supplier is able to Edit created Product. <smoke>', function() {
            cy.visit()
            cy.wait(3000)
            cy.get('a[href=\"/products\"]').click({ force: true })
            cy.wait(3000)
            cy.execute('/script/product_services/edit', this.edit_data)
            const characters ='0123456789';
            function generateString(length) {
                let result = ' ';
                const charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                const common_str = Cypress.env(`common_string`);
               return common_str + result;
            }
            const sku = generateString(6);
            cy.get('#product_sku').type(sku)
            cy.get('input[value=Save]').click()
        });
    });
});

