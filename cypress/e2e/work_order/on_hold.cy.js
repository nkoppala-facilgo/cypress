describe('Session Login ',()=>{
    beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
    cy.fixture(`data/${data_path}/work_order/on_hold/data`).then(function (data) {
        this.data = data;
    })     
 })
 describe("on hold workorder", function () {
  it('FC-1085 on hold work order  <smoke>', function () { 
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
    cy.visit('/dashboards/graph')
    cy.wait(3000);
    cy.get('.icon-menu-work-order').click()
    cy.contains('a','Create Work Orders').click({ force: true })
    cy.wait(5000)
    cy.get('#title').type(wo_name);
    cy.execute('script/work_order/on_hold',this.data)
   });
 });
});
 