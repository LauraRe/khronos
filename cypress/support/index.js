import "./commands";

beforeEach(function() {
	cy.visit("http://localhost:3000/");
	cy.server();
	cy.route({
		method: "GET",
		url: "https://demo.kimai.org/api/version",
		response: "fixture:login.json",
		headers: {
			"X-AUTH-USER": "susan_super",
			"X-AUTH-TOKEN": "api_kitten"
		}
	});
	cy.route({
		method: "POST",
		url: "https://demo.kimai.org/api/timesheets",
		response: "fixture:save_data.json",
		headers: {
			"X-AUTH-USER": "susan_super",
			"X-AUTH-TOKEN": "api_kitten"
		}
	});
	cy.route({
		method: "GET",
		url: "https://demo.kimai.org/api/customers?visible=3",
		response: "fixture:fetchCustomers.json",
		headers: {
			"X-AUTH-USER": "susan_super",
			"X-AUTH-TOKEN": "api_kitten"
		}
	});
	cy.route({
		method: "GET",
		url: "https://demo.kimai.org/api/timesheets",
		response: "fixture:get_data.json",
		headers: {
			"X-AUTH-USER": "susan_super",
			"X-AUTH-TOKEN": "api_kitten"
		}
	});
	cy.route({
		method: "GET",
		url: "https://demo.kimai.org/api/projects?visible=3",
		response: "fixture:fetchProjects.json",
		headers: {
			"X-AUTH-USER": "susan_super",
			"X-AUTH-TOKEN": "api_kitten"
		}
	});
	cy.route({
		method: "GET",
		url: "https://demo.kimai.org/api/activities?visible=3",
		response: "fixture:fetchActivities.json",
		headers: {
			"X-AUTH-USER": "susan_super",
			"X-AUTH-TOKEN": "api_kitten"
		}
	});
});
