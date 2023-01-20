describe("Session Login ", () => {
    beforeEach(() => {
		var data_path = Cypress.env(`data`);
		cy.fixture(`data/${data_path}/login/data`).then(function (data) {
		    cy.login_with_session(data.pmc.username, data.pmc.password);
		});
		cy.fixture(`data/${data_path}/setup/users/import_users/data`).then(function (data) {
			this.data = data;
		});
    });
    describe("User is able to import the users", function () {
		it("FC-1354 User is able to import the users <smoke> ", function () {
			const characters ="0123456789";
			function generateString(length) {
				let result = "";
				const charactersLength = characters.length;
				for (let i = 0; i < length; i++) {
					result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}
                return result;
			}
			cy.visit("/user_management");
			cy.task('writeXlsx', { file: 'cypress/fixtures/data/staging/assets/excel/Import users.xlsx', sheet: "Sheet1", email: generateString(5), first: generateString(5), last: generateString(5)});
			cy.execute("script/setup/users/import_users", this.data);
		});
    });
});
