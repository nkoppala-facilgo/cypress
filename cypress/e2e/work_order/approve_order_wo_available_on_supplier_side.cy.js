describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env("data");
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.technician1.username,data.technician1.password);
    });
    cy.fixture(`data/${data_path}/work_order/approve_order_wo_available_on_supplier_side/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Approve the Order and check that the Order and WO are available on the Supplier side", function () {
    it("FC-6828 check that the Order and WO are available on the Supplier side <smoke>", function () {
      cy.on("uncaught:exception", (err, runnable) => {return false;});
      cy.execute("/script/work_order/create", this.data);
      cy.execute("/script/work_order/next_step", this.data);
      cy.wait(8000);
      cy.get(".btn-toolbar > .pull-right").click({force: true});
      cy.get(".btn-info").click({force: true});
      cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
        cy.get("span[class=caret]").eq(0).click({force: true});
        cy.contains("Logout").click({force: true});
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.supplier.username,data.supplier.password);
        });
        cy.visit("/quote_requests");
        cy.wait(7000);
        cy.get("#scroll-search").find("div").find("li").first().click();
        cy.wait(7000);
        cy.contains("button", "Create Quote").click();
        cy.execute("/script/work_order/wo_available_on_supplier", this.data);
        cy.get("span[class=caret]").eq(0).click({force: true});
        cy.contains("Logout").click({force: true});
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.execute("script/login/login", data.technician1);
        });
        cy.contains("span", "Work Orders").click({force: true});
        cy.get("#data-work-orders").find("div").find("div").find("div").find("div").first().click();    
        cy.waitUntil(() => true);
        cy.wait(6000);
        cy.execute("/script/work_order/check_out_for_supplier_side",this.data);
        cy.select_by_placeholder_with_enter("Select...",this.data["nte_workflow"],3000);
        cy.get('textarea[placeholder="Your Notes/Reason"]').type(this.data["notes"]);
        cy.waitUntil(() => true);
        cy.get('button[class="btn btn btn-primary"]').contains("button", "Approve").click({force: true});
        cy.wait(6000);
        cy.get("span[class=caret]").eq(0).click({force: true});
        cy.contains("Logout").click({force: true});
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.execute("script/login/login", data.pmc);
        });
        cy.visit("/document_approval_logs?tab=requests");
        cy.wait(5000);
        cy.execute("/script/work_order/approval_for_supplier", this.data);
        cy.waitUntil(() => true);
        cy.get("span[class=caret]").eq(0).click({force: true});
        cy.contains("Logout").click({force: true});
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.execute("script/login/login", data.supplier);
        });
        cy.contains("span", "Work Orders").click({force: true});
        cy.get("#data-work-orders").find("div").find("div").find("div").find("div").first().click();
      });
    });
  });
});
