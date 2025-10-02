/**
 * Mock API module for blueprint operations.
 * Provides simulated data for testing the frontend without backend dependencies.
 *
 * @module apimock
 */
var apimock = (function() {

	var mockdata = [];

	// Original data
	mockdata["johnconnor"] = [
		{
			author: "johnconnor",
			points: [
				{x: 150, y: 120},
				{x: 215, y: 115},
				{x: 340, y: 240},
				{x: 15, y: 215}
			],
			name: "house"
		},
		{
			author: "johnconnor",
			points: [
				{x: 340, y: 240},
				{x: 15, y: 215},
				{x: 45, y: 225}
			],
			name: "gear"
		}
	];

	mockdata["maryweyland"] = [
		{
			author: "maryweyland",
			points: [
				{x: 140, y: 140},
				{x: 115, y: 115},
				{x: 95, y: 135}
			],
			name: "house2"
		},
		{
			author: "maryweyland",
			points: [
				{x: 140, y: 140},
				{x: 115, y: 115},
				{x: 200, y: 180},
				{x: 250, y: 190}
			],
			name: "gear2"
		}
	];

	// Additional mock data with more points
	mockdata["john"] = [
		{
			author: "john",
			points: [
				{x: 10, y: 10},
				{x: 10, y: 100},
				{x: 100, y: 100},
				{x: 100, y: 10},
				{x: 10, y: 10},
				{x: 50, y: 10},
				{x: 50, y: 50},
				{x: 80, y: 50},
				{x: 80, y: 80}
			],
			name: "house_design"
		},
		{
			author: "john",
			points: [
				{x: 0, y: 0},
				{x: 0, y: 80},
				{x: 120, y: 80},
				{x: 120, y: 0},
				{x: 0, y: 0},
				{x: 30, y: 20},
				{x: 30, y: 60},
				{x: 90, y: 60},
				{x: 90, y: 20},
				{x: 30, y: 20}
			],
			name: "office_design"
		}
	];

	mockdata["maria"] = [
		{
			author: "maria",
			points: [
				{x: 5, y: 5},
				{x: 5, y: 95},
				{x: 95, y: 95},
				{x: 95, y: 5},
				{x: 5, y: 5},
				{x: 25, y: 25},
				{x: 75, y: 25},
				{x: 75, y: 75},
				{x: 25, y: 75},
				{x: 25, y: 25}
			],
			name: "park_design"
		}
	];

	mockdata["carlos"] = [
		{
			author: "carlos",
			points: [
				{x: 0, y: 50},
				{x: 20, y: 45},
				{x: 40, y: 40},
				{x: 60, y: 40},
				{x: 80, y: 45},
				{x: 100, y: 50},
				{x: 80, y: 55},
				{x: 60, y: 60},
				{x: 40, y: 60},
				{x: 20, y: 55},
				{x: 0, y: 50}
			],
			name: "bridge_design"
		}
	];

	return {
		/**
		 * Retrieves all blueprints for a given author.
		 *
		 * @param {string} authname - The author name to search for
		 * @param {function} callback - Callback function that receives the blueprints array
		 */
		getBlueprintsByAuthor: function(authname, callback) {
			callback(mockdata[authname]);
		},

		/**
		 * Retrieves a specific blueprint by author and blueprint name.
		 *
		 * @param {string} authname - The author name
		 * @param {string} bpname - The blueprint name
		 * @param {function} callback - Callback function that receives the blueprint object
		 */
		getBlueprintsByNameAndAuthor: function(authname, bpname, callback) {
			callback(
				mockdata[authname].find(function(e) {
					return e.name === bpname;
				})
			);
		}
	};

})();

/*
Example of use:
var fun = function(list) {
    console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor", fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor", "house", fun);
*/
