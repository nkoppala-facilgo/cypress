describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/resend_invitation/data`).then(function ( data) {
      this.data = data;
    });
  });

  describe("Setup- Supplier|| To verify that PMC is able to 'Re- Invite' the supplier.", function () {
    it("Fc-5605 To verify that PMC is able to 'Re- Invite' the supplier.  <smoke>", function () {
      cy.visit("/property_suppliers");
      cy.execute("/script/setup/resend_invitation", this.data);
      cy.contains("Invitation sent.").should("be.visible");
    });
  });
});
