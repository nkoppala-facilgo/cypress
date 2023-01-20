describe("Fetch Work Orders", function () {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/api/wo_with_one_extra_attribute/data`).then(function (data) {
            this.data = data;
        });
    });
    it('Create_Post_Api', function () {
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
                    "extra_attrs": this.data['extra_attrs']
                }
        }).then((result) => {
            console.log(result);
            expect(result.status).to.eq(200);
            expect(result.statusText).to.eq("OK");
            expect(result.body.length).to.be.greaterThan(0);
            expect(result.body[0].workOrderItems[0].itemName).to.eq("Plumbing, Plumbing- Other, Next Available");
        }); 
    });
});
