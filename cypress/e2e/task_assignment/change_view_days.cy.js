describe('Session Login',()=>{
  beforeEach(() => {
    var data_path = Cypress.env(`data`)
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username,data.pmc.password);
    });
    cy.fixture(`data/${data_path}/task_assignment/filter/data`).then(function (data) {
      this.data = data;
    });
    cy.fixture(`data/${data_path}/common_data`).then(function(data) {
      this.api_data = data;
    });
  });
  describe("Documents -> Project/Matrices -> Task Assignments", function() {
    it("fc-5194 Verify changing the View on the Task Assignment Grid represents the select View days and associated WOs by technician <smoke>", function() {
      cy.visit();
      cy.waitUntil(() =>cy.get('i[title="Go to the Task Assignment"]'))
      cy.get('i[title="Go to the Task Assignment"]').parent().click({force:true});
      cy.waitUntil(() =>cy.contains('button','Clear'))
      cy.contains('button','Clear').click({force:true});
      cy.execute('/script/task_assignment/filter',this.data);
      cy.contains('button','Filter Tasks').click({force:true});
      cy.waitUntil(() =>cy.get('.confirm'))
      cy.get('.confirm').contains('OK').click()
      function checkView(option,count){
        cy.select_without_type('View',option,'.task-assignment__header-filter-form',3000)
        .waitUntil(() =>cy.get('#js-calendar-header-freeze').last())
        cy.get('#js-calendar-header-freeze')
        .find('div[class="task-assignment__cell task-assignment__cell--header"]')
        .should('have.length', count)
      }
      cy.log(this.api_data[`{day_view_value1}`])
      checkView("1 Day View", 1);
      checkView("3 Days View",3);
      checkView("1 Week View",7);
      checkView("1 Day View",1);
      });
  });
});
