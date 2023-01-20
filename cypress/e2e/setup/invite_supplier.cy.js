describe('Session Login ',()=>{
  beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/setup/data`).then(function (data) {
          this.data = data;
        });
});
describe("Setup - Suppliers|| User is able to invite new supplier from PMC", function () {
  it("Fc-5622 User is able to invite new supplier from PMC  <smoke>", function () {
    cy.visit('/property_suppliers');
    cy.contains("a", "Invite").click();
    cy.wait(20000);
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
        this.data['email'] = generateString(6);
      this.data['dba'] = generateString(6);
      this.data['vendor_code'] = generateString(5);
    cy.execute("script/setup/invite_supplier", this.data);
    cy.get('input[value="Send"]').click();
    cy.wait(2000)
    cy.contains('Invitation sent.').should('exist')
  });
});
});