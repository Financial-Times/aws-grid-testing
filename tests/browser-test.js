// Runs tests applicable to desktop browser environment

'use strict';

var windowHandle = '';

module.exports = {

	'Create session / open client': function (client) {
		client.url("http://imdb.com");
	},

	'Set timeout': function (client) {
		client.timeoutsImplicitWait(30000, function () {
			console.log("Successfully set implicit timeout to 30 sec.")
		});
	},

	'Check back navigation': function (client) {
		client.url("http://google.co.uk")
			.back()
			.waitForElementPresent("body", 10000)
			.getTitle(function (title) {
				console.log("Back to: " + title);
			});
	},

	'Check forward navigation': function (client) {
		client.forward()
			.waitForElementPresent("body", 10000)
			.getTitle(function (title) {
				console.log("Forward to: " + title);
			});
	},

	'Check reload navigation': function (client) {
		client.refresh()
			.waitForElementPresent("body", 10000)
			.getTitle(function (title) {
				console.log("Reloaded to: " + title);
			});
	},

	'Check Window Size': function (client) {
		console.log("Window Handling test");
		client.windowHandle(function (handle) {
			console.log("Window handle: " + handle.value);
			windowHandle = handle.value;
			this.windowSize(handle.value, function (size) {
				console.log(size.value);
			})
		})
	},

	'Check Window Handling': function (client) {
		client.maximizeWindow()
			.windowSize(windowHandle, function (size) {
				console.log(size.value);
			})
			.windowSize(windowHandle, 500, 600)
			.windowSize(windowHandle, function (size) {
				console.log(size.value);
			})
	},


	'Check element discovery / manipulation': function (client) {
		client.assert.elementPresent("input[name='q']", "The input box is present")
			.click("input[name='q']")
			.getAttribute("input[name='q']", "name", function (result) {
				console.log("Name of input box is " + JSON.stringify(result));
			})
			.getCssProperty("input[name='q']", "background-color", function (color) {
				console.log("Background-color: " + JSON.stringify(color));
			})
			.getElementSize("input[name='q']", function (size) {
				console.log("Input size: " + JSON.stringify(size));
			})
			.getLocation("input[name='q']", function (location) {
				console.log("Input location: " + JSON.stringify(location));
			})
			.getLocationInView("input[name='q']", function (location) {
				console.log("Input location in view: " + JSON.stringify(location));
			})
			.setValue("input[name='q']", "Monk")
			.click("button")
			.waitForElementPresent("#fbar", 10000)
	},

	'Get source code': function (client) {
		client.source(function (code) {
			//console.log("Source Code: " + JSON.stringify(code));
		})
	},

	'Cookie handling': function (client) {
		client.getCookies(function (cookies) {
			console.log("Number of cookies: " + cookies.value.length);
			console.log("Cookies: " + JSON.stringify(cookies))
		})
			.setCookie({
				name: "test_cookie",
				value: "test_value",
				path: "/"
			})
			.getCookies(function (cookies) {
				console.log("Number of cookies: " + cookies.value.length);

			})
			.deleteCookie("test_cookie")
			.getCookies(function (cookies) {
				console.log("Number of cookies: " + cookies.value.length);

			})
	},

	'Execute javascript': function (client) {
		client.execute(function (data) {
			window.scrollBy(1000,0);
		})
	},

	'Get a screenshot': function (client) {
		console.log(JSON.stringify(client.capabilities));
		client.saveScreenshot("./screenshots/" + client.capabilities.browserName + client.capabilities.version + ".png");
	},

	'Multiple element selection': function (client) {
		client.elements("css selector", "h3", function (results) {
			console.log("Elements: " + JSON.stringify(results));
		})
			.elements("xpath", "//h3", function (results) {
				console.log("Elements again: " + JSON.stringify(results))
			})
	},


	'Close client / end session': function (client) {
		client.end();
	}
};