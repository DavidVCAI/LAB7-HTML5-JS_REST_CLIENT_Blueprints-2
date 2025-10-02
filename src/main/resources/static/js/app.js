/**
 * Main application module for blueprint management.
 * Implements the Module Pattern to encapsulate state and operations.
 * Acts as a controller between the view (HTML) and the API layer.
 *
 * @author Jesús Pinzón & David Velásquez
 * @version 1.0
 * @since 2025-10-02
 *
 * @module app
 */
var app = (function() {

    /**
     * Private variable to store the currently selected author name.
     *
     * @private
     * @type {string}
     */
    var currentAuthor = null;

    /**
     * Private variable to store the list of blueprints for the current author.
     * Each blueprint is stored as an object with 'name' and 'points' properties.
     *
     * @private
     * @type {Array<{name: string, points: number}>}
     */
    var currentBlueprints = [];

    /**
     * Sets the current author name.
     *
     * @public
     * @param {string} authorName - The name of the author to set
     */
    var setCurrentAuthor = function(authorName) {
        currentAuthor = authorName;
    };

    /**
     * Gets the current author name.
     *
     * @public
     * @returns {string} The current author name
     */
    var getCurrentAuthor = function() {
        return currentAuthor;
    };

    /**
     * Updates the blueprints list for a given author.
     * This function orchestrates the entire flow:
     * 1. Fetches blueprints from the API
     * 2. Transforms the data to extract only name and number of points
     * 3. Updates the UI table with the blueprints
     * 4. Calculates and displays the total points
     *
     * @public
     * @param {string} authorName - The author whose blueprints to retrieve
     */
    var updateBlueprintsByAuthor = function(authorName) {
        setCurrentAuthor(authorName);
        apimock.getBlueprintsByAuthor(authorName, function(blueprints) {
            if (!blueprints || blueprints.length === 0) {
                $("#blueprintsTableBody").empty();
                $("#authorNameDisplay").html("<p class='text-warning'>No blueprints found for author: <strong>" + authorName + "</strong></p>");
                $("#totalPointsDisplay").text("");
                currentBlueprints = [];
                return;
            }

            // Step 1: Transform blueprints to objects with name and number of points
            currentBlueprints = blueprints.map(function(blueprint) {
                return {
                    name: blueprint.name,
                    points: blueprint.points.length
                };
            });

            // Step 2: Clear existing table rows
            $("#blueprintsTableBody").empty();

            // Display author name
            $("#authorNameDisplay").html("<h3>" + authorName + "'s blueprints:</h3>");

            // Step 3: Add each blueprint as a row in the table
            currentBlueprints.map(function(blueprint) {
                var row = "<tr>" +
                    "<td>" + blueprint.name + "</td>" +
                    "<td>" + blueprint.points + "</td>" +
                    "<td><button class='btn btn-info btn-sm' onclick=\"alert('Open functionality coming soon!')\">Open</button></td>" +
                    "</tr>";

                $("#blueprintsTableBody").append(row);
            });

            // Step 4: Calculate total points using reduce
            var totalPoints = currentBlueprints.reduce(function(accumulator, blueprint) {
                return accumulator + blueprint.points;
            }, 0);

            // Step 5: Update the total points display
            $("#totalPointsDisplay").html("Total user points: <span class='text-primary'>" + totalPoints + "</span>");
        });
    };

    /**
     * Initializes the application by setting up event handlers.
     * Should be called when the DOM is ready.
     *
     * @public
     */
    var init = function() {
        // Attach click event to the "Get blueprints" button
        $("#getBlueprintsBtn").click(function() {
            var authorName = $("#authorInput").val().trim();

            if (authorName === "") {
                alert("Please enter an author name");
                return;
            }

            updateBlueprintsByAuthor(authorName);
        });

        // Allow pressing Enter in the input field to trigger search
        $("#authorInput").keypress(function(event) {
            if (event.which === 13) { // Enter key
                $("#getBlueprintsBtn").click();
            }
        });
    };

    return {
        setCurrentAuthor: setCurrentAuthor,
        getCurrentAuthor: getCurrentAuthor,
        updateBlueprintsByAuthor: updateBlueprintsByAuthor,
        init: init
    };

})();


// Initialize the application when DOM is ready
$(document).ready(function() {
    app.init();
});
