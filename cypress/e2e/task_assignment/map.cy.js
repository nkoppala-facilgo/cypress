describe('Session Login',()=>{
    beforeEach(() => {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
      });
      cy.fixture(`data/${data_path}/task_assignment/map/data`).then(function (data) {
        this.data = data;
      });
    });
  
    describe("Verify user is able to view technician total time by click the technician pin on the map. ", function() {
      it("fc-5094 Verify user is able to view technician total time by click the technician pin on the map. <smoke>", function() {
        cy.visit();
        cy.wait(3000);
        cy.get('i[title="Go to the Task Assignment"]').parent().click({force:true});
        cy.execute('/script/task_assignment/filter',this.data);
        cy.contains('button','Filter Tasks').click({force:true});
        cy.wait(7000);
        cy.get('.task-assignment__header-filter-form').contains('label','Show Calendar From').parent().find('.input-group-addon').click({force:true});
        cy.get('.datepicker').find('tbody').find('tr').last().find('td').last().click({force:true});
        cy.wait(5000)
        cy.contains('button[class="btn btn-default"]','Map').click()
      });
    });
  });
