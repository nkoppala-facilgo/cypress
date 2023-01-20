const moment = require('moment')
describe("Post_api", function () {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/with_type_priority_created_and_range_3extraattributes/data`).then(function (data) {
            this.data = data;
        });
    });

    it('Create_Post_Api_with_type_priority_created_and_range_3extraattributes', function () {
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
                "type": this.data['type'],
                "priority": this.data['priority'],
                "created_date_from" : this.data['created_date_from'],
                "created_date_to" : this.data['created_date_to'],
                "extra_attrs": this.data['extra_attrs']
            }
        }).then((res) => {
            console.log(res);
            expect(res.status).to.eq(200);
            expect(res.statusText).to.eq("OK");
            expect(res.body.length).to.be.greaterThan(0);
            var datecompare = moment(res.body[0].createdAt).format("YYYY-MM-DD") >= this.data['created_date_from'] && moment(res.body[0].createdAt).format("YYYY-MM-DD") <= this.data['created_date_to']
            expect(datecompare).to.eq(true)
            expect(res.body[0].workOrderPriority.priorityCode).to.eq(this.data['priority']);
            expect(res.body[0].workOrderType.typeName).to.eq(this.data['type']);
        });
    });
});