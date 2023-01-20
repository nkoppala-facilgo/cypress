describe("_Post_Api", function () {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/with_multiple_statuses/data`).then(function (data) {
            this.data = data;
        });
    });

    it('Create_Post_Api_with_multiple_statuses', function () {
        var script_path = Cypress.env("base_url");
        var token = Cypress.env("token");
        cy.request({
            method : "POST",
            url : `${script_path}/facilgo_apis/filtered_work_orders`,
            headers: {
                "Authorization" : `${token}`
            },
                body: {
                    "property_code": this.data['property_code'],
                    "statuses": this.data['statuses']
                }
        }).then((result) => {
            console.log(result);
            expect(result.status).to.eq(200);
            expect(result.statusText).to.eq("OK");
            expect(result.body.length).to.be.greaterThan(0);
            const statuses = this.data['statuses']
            const statusCheck = result.body[0].status
            const resData = statuses.includes(statusCheck)
            expect(statuses.includes(statusCheck)).to.eq(true);
        });
    });
});