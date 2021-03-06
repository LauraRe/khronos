describe("Display Navbar", () => {
	it("when user navigates the site", () => {
		cy.get("#logo").should("be.visible");
		cy.get(".sign-in").should("be.visible");
		cy.get(".sign-out").should("not.be.visible");
		cy.get(".play").should("not.be.visible");
		cy.get(".stop").should("not.be.visible");
	});

	it("when user logs in", () => {
		cy
			.get('button').contains('Get started here!').click()
			.get(':nth-child(1) > .ui > input').type('susan_super')
			.get(':nth-child(2) > .ui > input').type('api_kitten')
			.get('button').contains("Login").click()
			.wait(1000)
			.get("#logo").should("be.visible")
			.get(".sign-in").should("not.be.visible")
			.get(".sign-out").should("be.visible")
			.get('.message').should("be.visible").contains("Welcome, susan_super!")
	})
});