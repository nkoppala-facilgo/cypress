const moment = require('moment')
describe("Fetch Work Orders", function () {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/with_all_filters/data`).then(function (data) {
            this.data = data;
        });
    });
	
    it('Create_Post_Api_with_all_filters', function () {
        var script_path = Cypress.env("base_url");
        var token = Cypress.env("token");
        cy.request({
                method : "POST",
                url : `${script_path}/facilgo_apis/filtered_work_orders`,
                headers: {
                    "Authorization" : `${token}`
                },
                body: {
                    "property_code" : this.data['property_code'],
                    "id" : this.data['id'],
                    "title": this.data['title'],
                    "statuses": this.data['statuses'],
                    "type": this.data['type'],
                    "priority": this.data['priority'],
                    "created_date_from" : this.data['created_date_from'],
                    "created_date_to" : this.data['created_date_to'],
                    "extra_attrs": this.data['extra_attrs'],
                }
        }).then((result) => {
            console.log(result);
            expect(result.status).to.eq(200);
            expect(result.statusText).to.eq("OK");
            expect(result.body.length).to.be.greaterThan(0);
            expect(result.body[0].title).to.eq(this.data['title']);
            var datecompare = moment(result.body[0].createdAt).format("YYYY-MM-DD") >= this.data['created_date_from'] && moment(result.body[0].createdAt).format("YYYY-MM-DD") <= this.data['created_date_to']
            expect(datecompare).to.eq(true)
                expect(result.body[0]).to.have.any.keys('workOrderItems', 'workOrderPriority','workOrderType')
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                expect(result.body[0].status).to.eq("SvcOrdered");
                expect(result.body[0].workOrderId).to.eq(1113041);
            }
            var data_path = Cypress.env(`data`)
            if(data_path=='preview'){
                expect(result.body[0].status).to.eq("UnassignedSched");
                expect(result.body[0].workOrderId).to.eq(1148755);
            }

        });
    });
});