describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/quote_request/void_button_not_appeared_on_qr_detail_page/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("To verify 'Void' button is not appear on ‘QR’ detail page and WO hierarchy on supplier side ", function () {
        it("FC-9038 'Void' button is not appear on ‘QR’ detail page and WO hierarchy on supplier side <regression>", function () {
            cy.visit();
            cy.execute("/script/work_order/create", this.data);
            cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val")
            .then((wo_number) => {
		cy.get("span[class=caret]").eq(0).click({force: true});
		cy.execute("/script/work_order/next_step", this.data);
		cy.wait(5000);
		cy.visit("/work_orders/" + wo_number);
		cy.get("#js-react-WorkOrderDocumentHierarchyView").find("div").find("table").find("tbody").find("tr").find("td").eq(2).find("a").invoke("text")
		.then((Quote_number) => {
		    cy.get("span[class=caret]").eq(0).click({force: true});
		    cy.contains("Logout").click({force: true});
		    var data_path = Cypress.env(`data`);
		    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
			cy.login_with_session(data.supplier.username, data.supplier.password);
		    });
		    cy.visit("/quote_requests/" + Quote_number);
		    cy.get('a[data-remote="true"]').first().dblclick({force: true});
		    cy.wait(5000);
		    cy.contains(".btn.btn-primary", "Create Quote").click();
		    cy.execute("/script/work_order/not_quoteclosed_for_openorders",this.data);
		    cy.contains("Documents").click();
		    cy.contains("a", "Work Orders").click({force: true});
		    cy.get(".fa-filter").click();
		    cy.select_by_label_with_enter("WO#(s):",  wo_number);
		    cy.contains("button", "Search").click({force: true});
	            cy.get('div[id="document-scroll-search"]').find("li").first().click();
		    cy.wait(5000);
		    cy.get("#js-react-WorkOrderView").find("div").find("div[class='document-area__section']").find("div").eq(33).find("div").find("span").click();
		    cy.contains("label","REFERENCE QR TITLE(S):").parent().find("div").find("p").find("a")
		    .then((qr_reference_link) => {
		    cy.contains("label","REFERENCE QR TITLE(S):").parent().find("div").find("p").find("a").invoke("removeAttr", "target").click({force: true});
		    cy.waitUntil(() => true);
		    let str = qr_reference_link.length;
		    let str1 = "";
		    for (let i = 0; i < str; i++) {
			if (qr_reference_link[i] == " ") {
			    break;
			} else {
			    str1 = str1 + qr_reference_link[i];
			}
		    }
		    });
		});
            });
        });
    });
});
