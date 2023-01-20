describe("Session Login ", () => {
    beforeEach(() => {
      	var data_path = Cypress.env(`data`);
      	cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        	cy.login_with_session(data.pmc.username, data.pmc.password);
      	});
      	cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/monitor_national_account_service_orders_urgent/data`).then(function (data) {
        	this.data = data;
      	});
      	cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/monitor_national_account_service_orders_emergency/data`).then(function (data) {
        	this.data1 = data;
      	});
      	cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/monitor_national_account_service_orders_nextavailable/data`).then(function (data) {
        	this.data2 = data;
      	});
    }); 

    describe("Administrator action items widget ", function () {
      	it("FC-11143 o verify that Created Non-Register supplier SvcOrdered Work Orders are displayed in the Admin Action Items widget's Monitor National Account Service Orders section urgent <smoke>", function () {
        	cy.visit();
        	cy.wait(4000);
            cy.get('#graph-content-0').find('tbody').find('tr').eq(11).find('td').eq(1).find('a').invoke('text')
            .then(text => {
				const count1 = text;
				cy.log("Count is => ",count1)
				cy.execute("/script/work_order/create", this.data);
				cy.execute("/script/work_order/non_catalog", this.data);
				cy.visit();
				cy.wait(4000);
				cy.get('#graph-content-0').find('tbody').find('tr').eq(10).find('td').eq(1).find('a').invoke('text')
				.then(text => {
              		const count2 = text;
              		cy.log("Count is => ",count2);
              		cy.log(count1 < count2); 
				});
			});
      	});
      	it("FC-11143 o verify that Created Non-Register supplier SvcOrdered Work Orders are displayed in the Admin Action Items widget's Monitor National Account Service Orders section emergency <smoke>", function () {
        	cy.visit();
        	cy.wait(4000);
            cy.get('#graph-content-0').find('tbody').find('tr').eq(11).find('td').eq(2).find('a').invoke('text')
            .then(text => {
				const count1 = text;
				cy.log("Count is => ",count1)
				cy.execute("/script/work_order/create", this.data1);
				cy.execute("/script/work_order/non_catalog", this.data1);
				cy.visit();
				cy.wait(4000);
				cy.get('#graph-content-0').find('tbody').find('tr').eq(11).find('td').eq(2).find('a').invoke('text')
				.then(text => {
              		const count2 = text;
              		cy.log("Count is => ",count2);
              		cy.log(count1 < count2); 
				});
			});
		});
		it("FC-11143 o verify that Created Non-Register supplier SvcOrdered Work Orders are displayed in the Admin Action Items widget's Monitor National Account Service Orders section next available <smoke>", function () {
			cy.visit();
			cy.wait(4000);
            cy.get('#graph-content-0').find('tbody').find('tr').eq(11).find('td').eq(3).find('a').invoke('text')
            .then(text => {
                const count1 = text;
                cy.log("Count is => ",count1)
				cy.execute("/script/work_order/create", this.data2);
				cy.execute("/script/work_order/non_catalog", this.data2);
				cy.visit();
				cy.wait(4000);
				cy.get('#graph-content-0').find('tbody').find('tr').eq(11).find('td').eq(3).find('a').invoke('text')
				.then(text => {
              		const count2 = text;
              		cy.log("Count is => ",count2);
              		cy.log(count1 < count2); 
				});
			});
		});
	});
});