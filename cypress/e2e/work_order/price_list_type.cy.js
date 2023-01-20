describe('Session Login ',()=>{
   beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
         cy.fixture(`data/${data_path}/login/data`).then(function (data) {
         cy.login_with_session(data.supplier.username,data.supplier.password);
         });
  cy.fixture(`data/${data_path}/work_order/price_list_type/data`).then(function (data) {
     this.data = data;
  })
 })
 describe("'Create Price List from quote", function () {
  it('Create and send Quote from supplier side  <smoke>', function () { 
   cy.visit('/quotes/new')
    cy.select_by_label('QUOTE TYPE:','Price List')
    cy.execute('script/work_order/create_order_from_quote/create_quote',this.data)

    cy.wait(3000);
    const characters ="0123456789";
    function generateString(length) {
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      const common_str = Cypress.env(`common_string`);
      return common_str + result;
    }

    cy.get('#supplier-contract-number').type(generateString(7))
   // cy.get('.placeholder').contains('Category').click().wait(2000).get('.dropdown-header').type('Abrasive diamond wheels').get('.name').wait(2000).click({force: true})
    cy.contains(".btn-success", "Save").click();
    cy.wait(2000)
    cy.contains(".btn-primary", "Send").click();
    cy.wait(10000);
 });
  //  it('Create Price List from quote  <smoke>', function () { 
  //   var data_path = Cypress.env(`data`);
  //    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
  //       cy.login_with_session(data.pmc.username,data.pmc.password);
  //       });
  //       cy.visit('/quotes')
  //     cy.get(".fa-filter").parent().click()
  //     cy.wait(5000);
  //     cy.execute("script/work_order/create_order_from_quote/search_quote", this.data);
  //     cy.get('#quotes_search_button').click()
  //     cy.get('a[data-remote="true"]').first().dblclick({force:true})
  //     cy.wait(10000)
  //     cy.contains('button','Accept').click()
  //     cy.get('i[class="fa fa-keyboard-o"]').click()
  //     cy.get('input[placeholder="type your signature in here"]').type('Hello')
  //     cy.contains('button','Sign & Send Quote').click()
  //     cy.select_by_label("WORKFLOW:", "Maintenance");
  //     cy.contains('button','Send').click()
  //     cy.get('textarea[placeholder="Scope Description..."]').type('Thank you')
  //     cy.get('button.btn.btn-sm.btn-primary').contains('Save').click({force:true})
  //     cy.contains('button','Send').click()
  //  });
 });
});