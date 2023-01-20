describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/supplier/new_supplier/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("User is able to invite new supplier from PMC", function () {
    it("FC-1344 User is able to invite new supplier from PMC <smoke> ", function () {
      cy.visit("/property_suppliers");
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
        this.data['email'] = generateString(5);
      this.data['vendor_code'] = generateString(6);
      cy.wait(4000);
      cy.execute("/script/setup/supplier/new_supplier", this.data);
      cy.wait(2000)
      cy.contains('Invitation sent.').should('exist')
    });
  });
});
