describe ('Login Screen', function () {
    it("Assets Load", function () {
       // cy.exec('npm run web', { failOnNonZeroExit: false }).then((result) => { })
        cy.visit('http://localhost:19006/')
        cy.contains(/Sign Up/i)
        cy.contains(/Sign In/i)
    })

    it("Click Sign in", function () {
        cy.visit('http://localhost:19006/')
        cy.contains(/Sign In/).click()
    })

    it("Login", function () {
        cy.get('[data-testid="login-input"]').type('abhishurawka22@gmail.com')
        cy.get('[data-testid="password-input"]').type('Irock22399*')
        cy.get('button.button-login')
        cy.contains(/Sign In/)
        //cy.pause()
        //cy.contains(/Home/)
        //cy.get('[disabled]').click({force: true})
        //cy.get('[data-testid="button-login"]').click()
    })})
/*
    it("Home", function () {
        cy.contains(/Home/i)
    })

    it("Navigation", function () {
        cy.contains(/Computer Science/i).click()
        cy.contains(/Day 2/i).click()
        cy.contains(/Stockholm/i).click()
        cy.contains(/Helsinki/i).click()
        cy.contains(/Copenhagen/i).click()
        cy.contains(/Oslo/i).click()
        //cy.get('[data-testid="test"]').click()
        cy.contains(/Submit/i).click()
    })
})
*/