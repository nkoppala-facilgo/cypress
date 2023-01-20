describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.fa.username, data.fa.password);
    });
    cy.fixture(`data/${data_path}/work_order/blocking_tech_calender/data`).then(
      function (data) {
        this.data = data;
      });
  });
  describe("send message to resident", function () {
    it("FC-3879 send message to resident", function () {
      cy.execute("/script/work_order/blocking_tech_calender", this.data);
      cy.execute("/script/work_order/reshedule", this.data);
    });
  });
});
