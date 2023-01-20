describe('Session Login ',()=>{
  beforeEach(() => {
          var data_path = Cypress.env(`data`)
          
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        });
});

describe("Setup - User|| Change pages through Pagination", function () {
  it("FC-1363  Change pages through Pagination  <smoke>", function () {
    cy.visit('/user_management')
    cy.get('ul.pagination').parent().find('a[role="button"]').contains(2).click();
  });
});
});