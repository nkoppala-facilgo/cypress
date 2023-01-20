describe("able for the pmc user to login", function () {
 it('pmc login test', function () { 
  var data_path = Cypress.env(`data`);
    cy.visit()
    cy.fixture(`data/${data_path}/login/data`).then(function (data) { 
      cy.execute('script/login/login', data.pmc)  
      cy.wait(10000)
      cy.contains("Logout").click({force: true}); 
    });

  });
});

describe("able for the supplier user to login", function () {
 it('supplier login test', function () { 
  var data_path = Cypress.env(`data`);
    cy.visit()
    cy.fixture(`data/${data_path}/login/data`).then(function (data) { 
      cy.execute('script/login/login', data.supplier)   
      cy.wait(10000)
      cy.contains("Logout").click({force: true}); 
    });
  });
});

describe("able for the administrator user to login", function () {
 it('admin login test', function () { 
  var data_path = Cypress.env(`data`);
    cy.visit();
    cy.fixture(`data/${data_path}/login/data`).then(function (data) { 
      cy.execute('script/login/login', data.administrator);
      cy.wait(10000)
      cy.contains("Logout").click({force: true}); 
    });    
  });
});