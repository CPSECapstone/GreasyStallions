  it("Visit Flipted", () => {
    // cy.exec('npm run web', { failOnNonZeroExit: false }).then((result) => { })
    // cy.exec('npm run web', { failOnNonZeroExit: false }).then((result) => { })
    cy.visit("http://localhost:19006/");
    //cy.get(".App-logo").should("be.visible");
  })

  it("Log In", () => {
    cy.get('[data-testid=aws-amplify__auth--username-input]').type('abhishurawka22@gmail.com');
    cy.get('[data-testid=aws-amplify__auth--password-input]').type('Password1!');
    cy.get('[data-testid=aws-amplify__auth--sign-in-button]').click();
  })
  
  it("Loading", () => {
    cy.wait(500);
  })

  it("Course Dashboard", () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
  })
    cy.wait(2500);
    cy.wait(3500);
    cy.get(':nth-child(4) > .r-alignItems-1awozwy > .r-alignSelf-k200y').click();
  })


  it("Interact with Class Page", () => {
    cy.wait(500);
    cy.get(':nth-child(5) > .r-flexDirection-18u37iz > .css-view-1dbjc4n').click();
    cy.wait(250);
    cy.get(':nth-child(3) > :nth-child(1) > .r-WebkitOverflowScrolling-150rngu > :nth-child(1) > :nth-child(1) > .css-text-901oao').click();
    cy.wait(500);
  })
  
  it("Interact with Tasks", () => {
    cy.wait(500);
    cy.get(':nth-child(3) > .r-borderRadius-6ncur5').click();
    cy.wait(250);
    cy.get('.r-bottom-1p0dtai.r-pointerEvents-12vffkv > :nth-child(2) > :nth-child(1) > .css-cursor-18t94o4 > .css-view-1dbjc4n').click();
    cy.wait(500);
    cy.get('[role="radiogroup"] > :nth-child(1) > .r-borderRadius-6ncur5').click();
    cy.wait(250);
    cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click();
    cy.wait(500);
  })

  it("View Missions", () => {
    cy.wait(250);
    cy.contains('Learning').click();
    cy.wait(250);
    cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click();
  })

  it("Open Drawer", () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
  })
    cy.wait(500);
    cy.get('[data-testid=bars]').click();
  })

  it("Interact with Goals", () => {
    cy.wait(250);
    cy.get(':nth-child(5) > .css-cursor-18t94o4 > .r-alignItems-1awozwy > .css-view-1dbjc4n > .css-text-901oao');
    cy.get(':nth-child(5) > .css-cursor-18t94o4 > .r-alignItems-1awozwy').click();
    cy.wait(250);
    cy.get('.r-borderStyle-1phboty > .css-cursor-18t94o4 > .css-view-1dbjc4n').click();
    cy.wait(250);
    cy.get(':nth-child(2) > :nth-child(1) > .css-view-1dbjc4n.r-paddingBottom-1mdbw0j > .css-textinput-11aywtz').type('Demo');
    cy.get(':nth-child(3) > :nth-child(1) > .css-view-1dbjc4n.r-paddingBottom-1mdbw0j > .css-textinput-11aywtz').type('Final Grade');
  })

  it("Add a Subgoal", () => {
    cy.get('.r-flexDirection-1d5kdc7 > :nth-child(1) > :nth-child(1) > .r-backgroundColor-1niwhzg > .css-cursor-18t94o4 > .css-view-1dbjc4n').click();
    cy.wait(250);
    cy.get('[data-testid=react-native-paper-dates-day-2021-5-9] > .css-view-1dbjc4n').click();
    cy.get('[data-testid=react-native-paper-dates-save] > .css-view-1dbjc4n').click();
    cy.wait(250);
    cy.get('[data-testid=subgoal]').click();
    cy.get(':nth-child(1) > :nth-child(1) > .css-view-1dbjc4n.r-paddingBottom-1mdbw0j > .css-textinput-11aywtz').type('Get an A in the class');
    cy.wait(500);
    cy.get('[data-testid=submit]').click();
  })

  it("Drawer SignOut", () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click();
    // cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click();
    cy.wait(250);
    cy.get('[data-testid=bars]').click();
    cy.wait(1000);
    cy.get(':nth-child(6) > .css-cursor-18t94o4 > .r-alignItems-1awozwy').click()
    cy.wait(500);
  })

/*
  it("Interact with a Task", () => {
    cy.get('button').contains('Rubric!').click()
    cy.wait(500)
    cy.get('.MuiDialog-container').click('left')
    cy.scrollTo('bottom')
    cy.wait(1000)
    // cy.get('.embed-responsive-item').click()
    // cy.get('iframe').should(iframe => expect(iframe.contents())
    // .then(iframe => cy.wrap(iframe.contents()))
    // .within({}, $iframe => {cy.click('center')}))
    cy.get('iframe').click()
    // cy.wait(10000)
    //cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(1) > .css-view-1dbjc4n > :nth-child(6)').click('center')
    cy.scrollTo('top')
    cy.get(':nth-child(4) > .MuiButtonBase-root > .MuiSvgIcon-root').click()
  })

  it("Interact with a Task, Page Two", () => {
    cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-11').click()
    cy.scrollTo('bottom')
    cy.get('.MuiInputBase-input').type('Team Morale at an all time HIGH!')
    cy.wait(500)
  })

  it("Go Back", () => {
    cy.get('.r-display-6koalj > :nth-child(2) > :nth-child(2) > :nth-child(1) > .r-minHeight-2llsf > .r-flexDirection-1d5kdc7 > :nth-child(2) > :nth-child(1) > [style="height: 64px;"] > .r-flex-13awgt0 > .r-justifyContent-1777fci.r-left-1d2f490 > [data-testid=header-back]').click()
  })

  it("Go to GoalPage", () => {
    cy.scrollTo('bottom')
    cy.get('.MuiButton-label').click()
  })

  it("Interact with Goals", () => {
    cy.get('.MuiListItem-root > .MuiSvgIcon-root').click()
    cy.get(':nth-child(3) > .MuiListItemIcon-root').click('center')
    cy.get(':nth-child(5) > .MuiListItemIcon-root').click('center')
    cy.get(':nth-child(7) > .MuiListItemIcon-root').click('center')
    cy.get(':nth-child(6) > .MuiListItem-root > .MuiListItemIcon-root').click('left')
  })

  it("Add a SubGoal", () => {
    cy.get(':nth-child(6) > .MuiListItemSecondaryAction-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
    cy.get('#standard-required').type('!!').clear().type('Do not miss a day')
    cy.get('#date').type('2021-06-09')
    cy.get('.MuiIconButton-label > .MuiButtonBase-root > .MuiButton-label').click()
    cy.get('.MuiListItemIcon-root > .MuiFormControl-root').type('Money Moves')
    cy.get('[type="submit"] > .MuiButton-label').click()
  })
  
  it("Drawer SignOut", () => {
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
*/