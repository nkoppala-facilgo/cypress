describe("Session Login ", () => {
    beforeEach(() => {
      	var data_path = Cypress.env(`data`);
      	cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        	cy.login_with_session(data.pmc.username, data.pmc.password);
      	});
      	cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/on_hold_wos_urgent/data`).then(function (data) {
        	this.data = data;
      	});
      	cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/on_hold_wos_emergency/data`).then(function (data) {
        	this.data1 = data;
      	});
      	cy.fixture(`data/${data_path}/work_order/administrator_action_items_widget/on_hold_wos_nextavailable/data`).then(function (data) {
        	this.data2 = data;
      	});
    }); 

    describe("Administrator action items widget ", function () {
      	it("FC-11075 Unscheduled:To verify that Created Hold WOs: Unscheduled-( Working Scheduling Backlog / Cannot Reach Resident / Pending Resident Action) Work Orders are displayed in the Admin Action Items widget's Hold WOs: Unscheduled section urgent <smoke>", function () {
        	cy.visit();
        	cy.wait(4000);
			cy.get('#graph-content-0').find('tbody').find('tr').eq(5).find('td').eq(1).find('a').invoke('text')
			.then(text => {
				const count1 = text;
				cy.log("Count is => ",count1);
				cy.execute("/script/work_order/create", this.data);
				cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
				cy.visit("/work_orders/"+wo_number)
				cy.execute('/script/work_order/administrator_action_items_on_hold_wos_unscheduled',this.data) 
				cy.visit();
				cy.wait(4000);
                cy.get('#graph-content-0').find('tbody').find('tr').eq(5).find('td').eq(1).find('a').invoke('text')
                .then(text => {
                    const count2 = text;
                    cy.log("Count is => ",count2);
                    cy.log(count1 < count2); 
      			});
    			});
      		});
    	});
      	it("FC-11075 Unscheduled:To verify that Created Hold WOs: Unscheduled-( Working Scheduling Backlog / Cannot Reach Resident / Pending Resident Action) Work Orders are displayed in the Admin Action Items widget's Hold WOs: Unscheduled section emergency <smoke>", function () {
        	cy.visit();
        	cy.wait(4000);
            cy.get('#graph-content-0').find('tbody').find('tr').eq(5).find('td').eq(2).find('a').invoke('text')
            .then(text => {
				const count1 = text;
				cy.log("Count is => ",count1);
				cy.execute("/script/work_order/create", this.data1);
				cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
				cy.visit("/work_orders/"+wo_number)
				cy.execute('/script/work_order/administrator_action_items_on_hold_wos_unscheduled',this.data1) 
				cy.visit();
				cy.wait(4000);
                cy.get('#graph-content-0').find('tbody').find('tr').eq(5).find('td').eq(2).find('a').invoke('text')
                .then(text => {
                    const count2 = text;
                    cy.log("Count is => ",count2);
                    cy.log(count1 < count2); 
      			});
    			});
      		});
		});
		it("FC-11075 Unscheduled:To verify that Created Hold WOs: Unscheduled-( Working Scheduling Backlog / Cannot Reach Resident / Pending Resident Action) Work Orders are displayed in the Admin Action Items widget's Hold WOs: Unscheduled section next available <smoke>", function () {
  			cy.visit();
  			cy.wait(4000);
         	 cy.get('#graph-content-0').find('tbody').find('tr').eq(5).find('td').eq(3).find('a').invoke('text')
          	.then(text => {
              	const count1 = text;
              	cy.log("Count is => ",count1);
  				cy.execute("/script/work_order/create", this.data2);
  				cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
    			cy.visit("/work_orders/"+wo_number)
				cy.execute('/script/work_order/administrator_action_items_on_hold_wos_unscheduled',this.data2) 
				cy.visit();
				cy.wait(4000);
				cy.get('#graph-content-0').find('tbody').find('tr').eq(5).find('td').eq(3).find('a').invoke('text')
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