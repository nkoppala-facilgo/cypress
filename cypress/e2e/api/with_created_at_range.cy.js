const moment = require('moment')
describe("_Post_Api", function () {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/with_created_at_range/data`).then(function (data) {
            this.data = data;
        });
    });
    it('Create_Post_Api_with_created_at_range', function () {
        var script_path = Cypress.env("base_url");
        var token = Cypress.env("token");
        cy.request({
            method : "POST",
            url : `${script_path}/facilgo_apis/filtered_work_orders`,
            headers: {
                "Authorization" : `${token}`
            },
            body: 
            {
                "property_code": this.data['property_code'],
                "created_date_from" :this.data['created_date_from'],
                "created_date_to" : this.data['created_date_to']
            }
        }).then((result) => {
            console.log(result);
            expect(result.status).to.eq(200);
            expect(result.statusText).to.eq("OK");
            expect(result.body.length).to.be.greaterThan(0);
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
            var datecompare = moment(result.body[0].createdAt).format("YYYY-MM-DD") >= this.data['created_date_from'] && moment(result.body[0].createdAt).format("YYYY-MM-DD") <= this.data['created_date_to']
            expect(datecompare).to.eq(true)
            }
            var data_path = Cypress.env(`data`)
            if(data_path=='preview'){
            var datecompare = moment(result.body[0].createdAt).format("YYYY-MM-DD") <= this.data['created_date_from'] && moment(result.body[0].createdAt).format("YYYY-MM-DD") <= this.data['created_date_to']
            expect(datecompare).to.eq(true)
            }
        })
    });
});