describe ('Login Screen', function () {
    it("Assets Load", function () {
        cy.exec('npm run web', { failOnNonZeroExit: false }).then((result) => { })
        cy.visit('http://localhost:19006/')
        cy.contains(/Sign Up/i)
        cy.contains(/Sign In/i)
    })

    it("Click Sign in", function () {
        cy.visit('http://localhost:19006/')
        cy.contains(/Sign In/).click()
    })

    it("Login", function () {
        cy.get('[data-testid="login-input"]').type('test@test.com')
        cy.get('[data-testid="password-input"]').type('Test123*')
        cy.contains(/Sign In/).click({force: true})
        //cy.contains(/Home/)
        //cy.get('[disabled]').click({force: true})
        //cy.get('[data-testid="signin-button"]').click()
    })
})