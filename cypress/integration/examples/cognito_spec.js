describe("Example test", () => {
    before(() => {
      cy.signIn();
    });
  
    after(() => {
      cy.clearLocalStorageSnapshot();
      cy.clearLocalStorage();
    });
  
    beforeEach(() => {
      cy.restoreLocalStorage();
    });
  
    afterEach(() => {
      cy.saveLocalStorage();
    });
  
    it("should be logged in", () => {
      //cy.exec('npm run web', { failOnNonZeroExit: false }).then((result) => { })
      cy.visit("http://localhost:19006/");
      
      //cy.get(".App-logo").should("be.visible");
    })

    it("Go to dashboard", () => {
      cy.visit("http://localhost:19006/")
      cy.contains(/Dashboard/i).click()
    })

    it("Is Homepage", () => {
      cy.contains(/David Johnson/i)
      cy.contains(/Health/)
      cy.contains(/TASKS/)
    })

  })