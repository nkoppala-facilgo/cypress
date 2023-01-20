
describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
describe('Session Login ',()=>{
    beforeEach(() => {
            var data_path = Cypress.env(`data`)
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
            });
            cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (data) {
                this.data = data;
            })
})
describe("next step work order ", function () {
  it('next step workorder  <smoke>', function () {
        var data_path = Cypress.env(`data`)
        cy.visit("/dashboards/graph")
        cy.contains("Documents").click()
        cy.contains('a','Work Orders').click({ force: true })
        cy.contains('a','Create Work Order').click({ force: true })
        cy.execute('/script/work_order/create',this.data)
        cy.wait(5000)
        cy.execute('/script/work_order/next_step',this.data)
        cy.wait(3000) 
        cy.contains('button[class="pull-right btn btn-default"]','Close').click({force:true})
        cy.contains('label','WO#:').parent().find('input[type=text]')
        .invoke('val')
        .then(wo_number => {
            cy.get('span[class=caret]').eq(0).click({force:true})   
            cy.contains('Logout').click({force:true})
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.execute('script/login/login', data.supplier2)
            });
            cy.contains("Documents").click()
            cy.contains('a','Quotes / Contracts').click({ force: true })
            cy.contains('a','Quote Requests').click({ force: true })
            cy.get('div[id=scroll-search]').find('li').first().find('a').first().click({force:true})
            cy.wait(5000)
            cy.contains('button','Create Quote').click({force:true})
            if (cy.find("Continue").length > 0){
                cy.get('.confirm').click()
            }
            cy.select_by_calendar_using_label('QUOTE EXPIRES:',this.data['quote_expires'])
            cy.get('input[placeholder="Unit Price"]').first().type(this.data['unit_price'])
            cy.select_by_placeholder('Property','111');
            cy.get('div[id=js-react-QuoteItemsTable]').contains('button','Save').click()
            cy.get('td > .btn-toolbar > .btn-danger').click()
            cy.contains('button','Send').click()
            cy.get('span[class=caret]').eq(0).click({force:true})   
            cy.contains('Logout').click({force:true})
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.execute('script/login/login', data.pmc2)
            });
            cy.visit("/quotes");
            cy.wait(3000)
            cy.get('div[id=scroll-search]').find('li').first().find('a').first().click({force:true})
            cy.wait(10000)
            cy.contains('button','Create Order').click({force:true})
            cy.select_by_placeholder('Type here to search',this.data['vendor_assignment'])
            cy.contains('button','Checkout').click({force:true})
            cy.wait(5000)
            cy.get('span[class=caret]').eq(0).click({force:true})   
            cy.contains('Logout').click({force:true})
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.execute('script/login/login', data.supplier2)
            });
            cy.visit("/work_orders/"+wo_number)
            cy.visit("/work_orders/"+wo_number)
            cy.contains('button','Edit').click({force:true})
            cy.execute('/script/work_order/supplier/complete',this.data)
            cy.wait(1000)
            cy.contains('button','Save').click({force:true})
            cy.wait(7000)
            cy.contains('button','Complete').click({force:true})
        }); 
    });
    cy.fixture(`data/${data_path}/work_order/next_step/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("next step work order ", function () {
    it("next step workorder  <smoke>", function () {
      var data_path = Cypress.env(`data`);
      cy.visit("/dashboards/graph");
      cy.contains("Documents").click();
      cy.contains("a", "Work Orders").click({ force: true });
      cy.contains("a", "Create Work Order").click({ force: true });
      cy.execute("/script/work_order/create", this.data);
      cy.wait(5000);
      cy.execute("/script/work_order/next_step", this.data);
      cy.wait(3000);
      cy.contains('button[class="pull-right btn btn-default"]', "Close").click({
        force: true,
      });
      cy.contains("label", "WO#:")
        .parent()
        .find("input[type=text]")
        .invoke("val")
        .then((wo_number) => {
          cy.get("span[class=caret]").eq(0).click({ force: true });
          cy.contains("Logout").click({ force: true });
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.execute("script/login/login", data.supplier2);
          });
          cy.contains("Documents").click();
          cy.contains("a", "Quotes / Contracts").click({ force: true });
          cy.contains("a", "Quote Requests").click({ force: true });
          cy.get("div[id=scroll-search]")
            .find("li")
            .first()
            .find("a")
            .first()
            .click({ force: true });
          cy.wait(5000);
          cy.contains("button", "Create Quote").click({ force: true });
          cy.select_by_calendar_using_label(
            "QUOTE EXPIRES:",
            this.data["quote_expires"]
          );
          cy.get('input[placeholder="Unit Price"]').type(
            this.data["unit_price"]
          );
          cy.get("div[id=js-react-QuoteItemsTable]")
            .contains("button", "Save")
            .click();
          cy.contains("button", "Send").click();
          cy.get("span[class=caret]").eq(0).click({ force: true });
          cy.contains("Logout").click({ force: true });
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.execute("script/login/login", data.pmc2);
          });
          cy.contains("a", "Documents").click();
          cy.get(
            "#js-react-FacilgoLeftNavbar > aside > section > ul > li.treeview.new-treeview-menu.active > ul > li:nth-child(4) > a > span"
          ).click();
          cy.get(
            "#js-react-FacilgoLeftNavbar > aside > section > ul > li.treeview.new-treeview-menu.active > ul > li.treeview.new-treeview-menu.active > ul > li:nth-child(2) > a > span"
          ).click();
          cy.get("div[id=scroll-search]")
            .find("li")
            .first()
            .find("a")
            .first()
            .click();
          cy.wait(10000);
          cy.contains("button", "Create Order").click({ force: true });
          cy.select_by_placeholder(
            "Type here to search",
            this.data["vendor_assignment"]
          );
          cy.contains("button", "Checkout").click({ force: true });
          cy.wait(5000);
          cy.get("span[class=caret]").eq(0).click({ force: true });
          cy.contains("Logout").click({ force: true });
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.execute("script/login/login", data.supplier2);
          });
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(
              data.supplier2.username,
              data.supplier2.password
            );
          });
          cy.visit("/work_orders/" + wo_number);
          cy.visit("/work_orders/" + wo_number);
          cy.contains("button", "Edit").click();
          cy.execute("/script/work_order/supplier/complete", this.data);
          cy.wait(1000);
          cy.contains("button", "Save").click();
          cy.wait(7000);
          cy.contains("button", "Complete").click();
        });
    });
  });
});
