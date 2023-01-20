describe("Get_api", function () {
    it('no_payload', function () {
        cy.request({
            method : "GET",
            url : 'https://staging.facilgo.com/facilgo_apis/users?emails=stagingtestpmc@yopmail.com',
            headers : {
                "Authorization": 'Bearer 3axjjinI98nkqyKORS2N7g'
            } 
        }).then((result) => {
            console.log(result);
            expect(result.status).to.eq(200);
            expect(result.statusText).to.eq("OK");
            expect(result.body.length).to.be.greaterThan(0);
            expect(result.body[0].firstName).to.eq("Staging");
            expect(result.body[0].userType).to.eq("Company Admin");
            expect(result.body[0].accessLevel).to.eq("Company");
            expect(result.body[0].email).to.eq("stagingtestpmc@yopmail.com");
            expect(result.body[0].timeZone).to.eq("New Delhi");
        });
        cy.request({
            method : "GET",
            url : 'https://preview.facilgo.com/facilgo_apis/users?emails=sfrfkhpreviewpmc@yopmail.com',
            headers : {
                "Authorization": 'Bearer 89_jdJT-LXdjWOrYaf-kCw'
            } 
        }).then((result) => {
            console.log(result);
            expect(result.status).to.eq(200);
            expect(result.statusText).to.eq("OK");
            expect(result.body.length).to.be.greaterThan(0);
            expect(result.body[0].firstName).to.eq("SFR FKH");
            expect(result.body[0].userType).to.eq("Company Admin");
            expect(result.body[0].accessLevel).to.eq("Company");
            expect(result.body[0].email).to.eq("sfrfkhpreviewpmc@yopmail.com");
            expect(result.body[0].timeZone).to.eq("Central Time (US & Canada)");
        });
    });
});