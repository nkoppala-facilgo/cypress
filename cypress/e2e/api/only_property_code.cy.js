describe("Post_Api", function () {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/only_property_code/data`).then(function (data) {
            this.data = data;
        });
    });

    it('Create_Post_Api_only_property_code', function () {
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
                    "id": this.data['id']
                }
        }).then((result) => {
            console.log(result);
            expect(result.status).to.eq(200);
            expect(result.statusText).to.eq("OK");
            expect(result.body.length).to.be.greaterThan(0);
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
            expect(result.body[0].workOrderId).to.eq(1171404);
            }
            var data_path = Cypress.env(`data`)
            if(data_path=='preview'){
            expect(result.body[0].workOrderId).to.eq(1149177);
            }
        });
    });
});