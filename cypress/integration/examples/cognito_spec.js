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
      // cy.exec('npm run web', { failOnNonZeroExit: false }).then((result) => { })
      cy.visit("http://localhost:19006/");
      
      //cy.get(".App-logo").should("be.visible");
    })

    it("Go to dashboard", () => {
      // cy.visit("http://localhost:19006/")
      cy.get('.btn').click()
      // cy.contains(/Dashboard/i).click()
    })

    it("Is Homepage", () => {
      cy.contains(/Goals/i)
    })

    it("Go to Quiz Page", () => {
      cy.get(':nth-child(2) > :nth-child(1) > h3').click()
      cy.get('.btn-group > :nth-child(3)').click()
      cy.get(':nth-child(4) > .btn-group > :nth-child(2)').click()
      cy.get(':nth-child(3) > .btn-group > :nth-child(1)').click()
      cy.get(':nth-child(4) > .btn-group > :nth-child(2)').click()
      cy.get('.btn-group > :nth-child(5)').click()
      cy.get(':nth-child(4) > .btn-group > :nth-child(2)').click()
      cy.get('.btn-group > :nth-child(4)').click()
      cy.get(':nth-child(4) > .btn-group > :nth-child(2)').click()
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click()
      cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click()
    })

    it("Go to Quiz Video", () => {
      cy.get(':nth-child(2) > h3').click()
      cy.wait(2000)
      // cy.get('[data-testid="YouTube"]').click()
      cy.get(':nth-child(1) > form').click('center')
      // cy.wait(2000)
      cy.get(':nth-child(3) > .btn-group > :nth-child(3)').click()
      cy.get(':nth-child(4) > .btn-group > :nth-child(1)').click()
      cy.get(':nth-child(5) > .btn-group > :nth-child(5)').click()
      cy.get(':nth-child(6) > .btn-group > :nth-child(4)').click()
      cy.get('form > .btn-primary').click()
      cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click()
    })

    it("Go to Sample Task", () => {
      cy.get(':nth-child(3) > h3').click()
      cy.scrollTo('bottom')
      cy.wait(500)
      cy.get('.embed-responsive-item').click()
      cy.scrollTo('top')
      cy.get(':nth-child(4) > .page-link').click()
      cy.scrollTo('center')
      cy.get(':nth-child(2) > fieldset > .form-group > :nth-child(2) > #answers').click()
      cy.get(':nth-child(3) > fieldset > .form-group > :nth-child(3)').click('left')
      cy.get(':nth-child(4) > fieldset > .form-group > :nth-child(4)').click('left')
      cy.get(':nth-child(5) > :nth-child(1) > .btn')
      cy.scrollTo('bottom')
      cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click()
    })

    it("Create Goals", () => {
      // cy.get('.card-body > .list-group > :nth-child(2)').get('#\30 \ 1').click()
      cy.get('.text-center > .btn').click()
      cy.get('[placeholder="Goal Title"]').type('Test Everything')
      cy.get('[placeholder="9/21/3000"]').type('2021-06-09')
      cy.get('.col-sm-4 > .btn').click()
      cy.get('.col-sm-9').type('No Bugs Found')
      cy.get('[type="submit"]').click()
    })

    it("Interact with Goals", () => {
      cy.scrollTo('bottom')
      cy.get(':nth-child(4) > .accordion > .card > .collapse > .card-body > .list-group > .list-group-item > .row > :nth-child(3) > form > .form-group > .form-check').click()
      cy.get('.col-sm-4 > .form-group > .form-check').click('left')
      cy.scrollTo('center')
    })

    it("View Missions", () => {
      cy.get('.text-left > .btn').click()
      cy.get('.css-view-1dbjc4n > :nth-child(2) > .accordion > .card > .card-header > :nth-child(1) > :nth-child(1) > .btn').click()
      cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click()
    })

    it("Check Drawer", () => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-right-zchlnj > .css-view-1dbjc4n > .css-text-901oao').click()
      cy.get(':nth-child(2) > .css-cursor-18t94o4 > .r-alignItems-1awozwy > .css-view-1dbjc4n > .css-text-901oao').click()
      cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-right-zchlnj > .css-view-1dbjc4n > .css-text-901oao').click()
      cy.get(':nth-child(3) > .css-cursor-18t94o4 > .r-alignItems-1awozwy > .css-view-1dbjc4n > .css-text-901oao').click()
    })

  })