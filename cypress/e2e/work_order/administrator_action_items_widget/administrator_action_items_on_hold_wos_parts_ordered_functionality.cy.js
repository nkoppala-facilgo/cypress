describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/on_hold_wos_parts_ordered_urgent/data`).then(function (data) {
            this.data = data;
        });
        cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/on_hold_wos_parts_ordered_emergency/data`).then(function (data) {
            this.data1 = data;
        });
        cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/on_hold_wos_parts_ordered_nextavailable/data`).then(function (data) {
            this.data2 = data;
        });
    }); 

    describe("Administrator action items widget ", function () {
        it("FC-11077 To verify that Created Parts Ordered Work Orders are displayed in the Admin Action Items widget's On Hold: Parts Ordered section urgent <smoke>", function () {
            cy.visit();
            cy.wait(4000);
            cy.get('#graph-content-0').find('tbody').find('tr').eq(9).find('td').eq(1).find('a').invoke('text')
            .then(text => {
                const count1 = text;
                cy.log("Count is => ",count1)
                cy.execute("/script/work_order/create", this.data);
                cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
                cy.visit("/work_orders/"+wo_number)
                cy.get("#document-scroll-search").find("div").find("li").first().click();
                cy.execute('/script/work_order/administrator_action_items_on_hold_wos_unscheduled',this.data) 
                cy.visit();
                cy.wait(4000);
                cy.get('#graph-content-0').find('tbody').find('tr').eq(9).find('td').eq(1).find('a').invoke('text')
                .then(text => {
                    const count2 = text;
                    cy.log("Count is => ",count2);
                    cy.log(count1 < count2); 
                });
                });
            });
        });

        it("FC-11077 To verify that Created Parts Ordered Work Orders are displayed in the Admin Action Items widget's On Hold: Parts Ordered section emergency <smoke>", function () {
            cy.visit();
            cy.wait(4000);
            cy.get('#graph-content-0').find('tbody').find('tr').eq(9).find('td').eq(2).find('a').invoke('text')
            .then(text => {
                const count1 = text;
                cy.log("Count is => ",count1)
                cy.execute("/script/work_order/create", this.data1);
                cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
                cy.visit("/work_orders/"+wo_number)
                cy.get("#document-scroll-search").find("div").find("li").first().click();
                cy.execute('/script/work_order/administrator_action_items_on_hold_wos_unscheduled',this.data1) 
                cy.visit();
                cy.wait(4000);
                cy.get('#graph-content-0').find('tbody').find('tr').eq(9).find('td').eq(2).find('a').invoke('text')
                .then(text => {
                    const count2 = text;
                    cy.log("Count is => ",count2);
                    cy.log(count1 < count2); 
                });
                });
            });
        });
        it("FC-11077To verify that Created Parts Ordered Work Orders are displayed in the Admin Action Items widget's On Hold: Parts Ordered section next available <smoke>", function () {
            cy.visit();
            cy.wait(4000);
            cy.get('#graph-content-0').find('tbody').find('tr').eq(9).find('td').eq(3).find('a').invoke('text')
            .then(text => {
                const count1 = text;
                cy.log("Count is => ",count1)
                cy.execute("/script/work_order/create", this.data2);
                cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
                cy.visit("/work_orders/"+wo_number)
                cy.get("#document-scroll-search").find("div").find("li").first().click();
                cy.execute('/script/work_order/administrator_action_items_on_hold_wos_unscheduled',this.data2) 
                cy.visit();
                cy.wait(4000);
                cy.get('#graph-content-0').find('tbody').find('tr').eq(9).find('td').eq(3).find('a').invoke('text')
                .then(text => {
                    const count2 = text;
                    cy.log("Count is => ",count2);
                    cy.log(count1 < count2); 
                }); 
                });
            });
        });
    });
});