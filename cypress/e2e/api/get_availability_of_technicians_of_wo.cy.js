describe("Post_Api", function () {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/get_availability_of_technicians_of_wo/data`).then(function (data) {
            this.data = data;
        });
    });

    it('Create_Post_Api_get_availability_of_technicians_of_wo', function () {
        var script_path = Cypress.env("base_url");
        var token = Cypress.env("token");
        cy.request({
            method : "POST",
            url : `${script_path}/facilgo_apis/user_schedule`,
            headers: {
                "Authorization" : `${token}`
            },
            body: {
                "property_code": this.data['property_code'],
                "start_date": this.data['start_date'],
                "end_date": this.data['end_date'],
                "match_all_skills": this.data['match_all_skills'],
                "user_types": this.data['user_types'],
                "extra_attrs": this.data['extra_attrs'],
                "agent": this.data['agent']
            }
        }).then((result) => {
            console.log(result);
            expect(result.status).to.eq(200);
            expect(result.statusText).to.eq("OK");
            expect(result.body.length).to.be.greaterThan(0);
            expect(result.body[0].scheduleDate).to.eq( this.data['start_date']);
        });
    });
});