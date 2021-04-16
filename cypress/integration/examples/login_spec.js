describe ('Login Screen', function () {
    it("Assets Load", function () {
        //cy.exec('npm run web', { failOnNonZeroExit: false }).then((result) => { })
        cy.visit('http://localhost:19006/')
        //cy.contains(/Sign Up/i)
        cy.contains(/Sign/i)
    })
/*
    describe('Cognito', function () {
        beforeEach(function () {
          // Seed database with test data
          cy.task('db:seed')
      
          // Programmatically login via Amazon Cognito API
          cy.loginByCognitoApi(
            Cypress.env('cognito_username'),
            Cypress.env('cognito_password')
          )
        })
      
        it('shows onboarding', function () {
          cy.contains('Get Started').should('be.visible')
        })
      })*/
    
    
    })
/*
    it("Click Sign in", function () {
        //cy.visit('http://localhost:19006/')
        cy.contains(/Sign/).click()
        cy.get('.panel-left-border > :nth-child(2) > :nth-child(1) > .cognito-asf > :nth-child(3) > #signInFormUsername').click().type('test@calpoly.edu')
        cy.get('.panel-left-border > :nth-child(2) > :nth-child(1) > .cognito-asf > :nth-child(5) > #signInFormPassword').click().type('Password1!')
        cy.get('.panel-left-border > :nth-child(2) > :nth-child(1) > .cognito-asf > .btn').click()
        cy.visit('http://localhost:19006/')
        //cy.contains(/Sign In/i).click({force:true})
        //cy.visit('https://flipted-ios-test.auth.us-east-1.amazoncognito.com/login?redirect_uri=http%3A%2F%2Flocalhost%3A19006%2F&response_type=token&client_id=24sdf1brebo58s89ja0b63c51d&identity_provider=COGNITO&scope=phone%20email%20profile%20openid%20aws.cognito.signin.user.admin&state=iHEQJoFEOCG04U1uZmpw5BY9BM98DzyB')
        //cy.go(-1)
        //cy.pause()
    })

    it("Login", function () {
        // cy.get('[data-testid="login-input"]').type('test@calpoly.edu')
        // cy.get('[data-testid="password-input"]').type('Password1!')
        // cy.get('button.button-login')
        // cy.get('button').click()
        // cy.visit('http://localhost:19006/')
        // cy.contains(/Google/).click({force: true})
        //cy.pause()
        //cy.contains(/Home/)
        //cy.get('[disabled]').click({force: true})
        //cy.get('[data-testid="button-login"]').click()
    })

    it("Home", function () {
        cy.get('input')
        cy.get('#parent')
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

})*/