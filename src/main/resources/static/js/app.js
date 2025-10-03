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
var app = (function () {

    // ========== API CONFIGURATION ==========
    /**
     * Configure which API to use: apimock or apiclient
     * Change this line to switch between mock data and real API
     *
     * @private
     */
    var api = apiclient;  // Change to apiclient when backend is ready

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
    var setCurrentAuthor = function (authorName) {
        currentAuthor = authorName;
    };

    /**
     * Gets the current author name.
     *
     * @public
     * @returns {string} The current author name
     */
    var getCurrentAuthor = function () {
        return currentAuthor;
    };

    /**
     * Draws a blueprint on the canvas using HTML5 Canvas API.
     * Retrieves the specific blueprint data and draws connected line segments.
     *
     * @public
     * @param {string} authorName - The name of the author
     * @param {string} blueprintName - The name of the blueprint to draw
     */
    var drawBlueprint = function (authorName, blueprintName) {
        // Use the configured API (apimock or apiclient)
        api.getBlueprintsByNameAndAuthor(authorName, blueprintName, function (blueprint) {
            if (!blueprint) {
                alert("Blueprint not found: " + blueprintName + " by " + authorName);
                return;
            }

            // Show canvas section and update the current blueprint display
            $("#canvasContainer").show();
            $("#currentBlueprintDisplay").text("Current blueprint: " + blueprint.name);

            // Get canvas and context
            var canvas = document.getElementById("blueprintCanvas");
            var ctx = canvas.getContext("2d");

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set drawing properties
            ctx.strokeStyle = "#333";
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // Draw the blueprint points as connected lines
            if (blueprint.points && blueprint.points.length > 0) {
                ctx.beginPath();

                // Move to the first point
                ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);

                // Draw lines to subsequent points
                for (var i = 1; i < blueprint.points.length; i++) {
                    ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y);
                }

                ctx.stroke();

                // Draw points as small circles for better visualization
                ctx.fillStyle = "#666";
                for (var j = 0; j < blueprint.points.length; j++) {
                    ctx.beginPath();
                    ctx.arc(blueprint.points[j].x, blueprint.points[j].y, 3, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        });
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
    var updateBlueprintsByAuthor = function (authorName) {
        setCurrentAuthor(authorName);
        api.getBlueprintsByAuthor(authorName, function (blueprints) {
            if (!blueprints || blueprints.length === 0) {
                $("#blueprintsTableBody").empty();
                $("#authorNameDisplay").text("No blueprints found for author: " + authorName);
                $("#totalPointsDisplay").text("");
                $("#tableContainer").show();
                $("#canvasContainer").hide();
                currentBlueprints = [];
                return;
            }

            // Step 1: Transform blueprints to objects with name and number of points
            currentBlueprints = blueprints.map(function (blueprint) {
                return {
                    name: blueprint.name,
                    points: blueprint.points.length
                };
            });

            // Step 2: Clear existing table rows
            $("#blueprintsTableBody").empty();

            // Show table container and display author name
            $("#tableContainer").show();
            $("#authorNameDisplay").text(authorName + "'s blueprints:");

            // Step 3: Add each blueprint as a row in the table
            currentBlueprints.map(function (blueprint) {
                var row = "<tr>" +
                    "<td>" + blueprint.name + "</td>" +
                    "<td>" + blueprint.points + "</td>" +
                    "<td><button class='blueprint-btn' " +
                    "onclick=\"app.drawBlueprint('" + authorName + "', '" + blueprint.name + "')\">" +
                    "Open" +
                    "</button></td>" +
                    "</tr>";

                $("#blueprintsTableBody").append(row);
            });

            // Step 4: Calculate total points using reduce
            var totalPoints = currentBlueprints.reduce(function (accumulator, blueprint) {
                return accumulator + blueprint.points;
            }, 0);

            // Step 5: Update the total points display
            $("#totalPointsDisplay").text("Total user points: " + totalPoints);
        });
    };

    /**
     * Initializes the application by setting up event handlers.
     * Should be called when the DOM is ready.
     *
     * @public
     */
    var init = function () {
        // Attach click event to the "Get blueprints" button
        $("#getBlueprintsBtn").click(function () {
            var authorName = $("#authorInput").val().trim();

            if (authorName === "") {
                alert("Please enter an author name");
                return;
            }

            updateBlueprintsByAuthor(authorName);
        });

        // Allow pressing Enter in the input field to trigger search
        $("#authorInput").keypress(function (event) {
            if (event.which === 13) { // Enter key
                $("#getBlueprintsBtn").click();
            }
        });
    };

    return {
        setCurrentAuthor: setCurrentAuthor,
        getCurrentAuthor: getCurrentAuthor,
        updateBlueprintsByAuthor: updateBlueprintsByAuthor,
        drawBlueprint: drawBlueprint,
        init: init
    };

})();


// Initialize the application when DOM is ready
$(document).ready(function () {
    app.init();
});
