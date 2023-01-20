describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.technician.username,data.technician.password);
    });
    cy.fixture(`data/${data_path}/work_order/zero_nte/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
      this.data1 = data;
    });
  });
  describe("To verify user is able to send QR to supplier when NTE amount $0 on WO.", function () {
    it("schedule a work order and create a QR from it  <smoke>", function () {
      cy.visit("/dashboards/graph");

      const characters = "0123456789";
      function generateString(length) {
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        const common_str = Cypress.env(`common_string`);
        return common_str + result;
      }
      const wo_name = generateString(6);
      cy.execute("script/work_order/approve_nte", this.data);
      cy.get('input[placeholder="- Work Order Title -"]').type(wo_name);
      cy.contains("button", " Work Order Item").click();
      cy.wait(5000);
      cy.get('input[placeholder="- Item Name -"]').type(this.data["item_name"]);
      cy.get('textarea[placeholder="- Instruction -"]').type(
        this.data["Introduction1"]
      );
      cy.get("div.modal-footer > button.btn.btn-success").click();
      cy.contains("Success!").should("exist");
      cy.wait(3000);
      cy.contains("button", "OK").click();
      cy.visit("/work_orders");
      cy.get(".fa-filter").click({ multiple: true });
      cy.wait(3000);
      cy.select_by_label("Work Order Title(s):", wo_name);
      cy.contains("button", "Search").click();
      cy.wait(4000);
      cy.get(".btn-show-work-order").first().dblclick({ force: true });
      cy.wait(10000);

      cy.execute("/script/work_order/create_qr_nte", this.data1);
    });
  });
});
