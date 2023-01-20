describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/quote_request/void_button_not_appeared_in_qr_page_on_pmc/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("To verify 'Void' button is not appear on ‘QR’ detail page and WO hierarchy on PMC side ", function () {
        it("FC-9039 'Void' button is not appear on ‘QR’ detail page and WO hierarchy on PMC side <regression>", function () {
            cy.visit();
            cy.execute("/script/work_order/create", this.data);
            cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val")
            .then((wo_number) => {
                cy.get("span[class=caret]").eq(0).click({force: true});
                cy.execute("/script/work_order/next_step", this.data);
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
                    cy.contains(".btn.btn-primary", "Create Quote").click();
                    cy.execute("/script/work_order/not_quoteclosed_for_openorders",this.data);
                    cy.get("span[class=caret]").eq(0).click({force: true});
                    cy.contains("Logout").click({force: true});
                    var data_path = Cypress.env(`data`);
                    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.execute("script/login/login", data.pmc);
                    });
                    cy.visit();
                    cy.contains("Documents").click();
                    cy.contains("a", "Work Orders").click({force: true});
                    cy.get(".fa-filter").click();
                    cy.select_by_label_with_enter("WO#(s):",  wo_number);
                    cy.contains("button", "Search").click({force: true});
                    cy.get('div[id="document-scroll-search"]').find("li").first().click();
                    cy.get("#js-react-WorkOrderView").find("div").find("div[class='document-area__section']").find("div").eq(34).find("div").find("span").click()
                    cy.get("#js-react-WorkOrderView > div > div.document-area__section > div:nth-child(19) > div > div > p > a")
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
