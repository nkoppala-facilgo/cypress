describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/inspection/save_inspection/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Property Image in Create Inspection", function () {
        it("FC-5444 Verify that user can add or remove the property image in Inspection page <smoke>", function () {
            const characters = "0123456789";
            function generateString(length) {
            let result = "";
            const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
                }
                const common_str = Cypress.env(`common_string`);
                return common_str + result;
            }
            this.data.inspection_title = generateString(6);
            cy.execute("script/inspection/add_or_remove_the_property_image", this.data);
        });
    });
});
