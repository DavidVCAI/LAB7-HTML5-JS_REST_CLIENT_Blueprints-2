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
     * Private variable to store the current blueprint being edited.
     * Contains the full blueprint object with all points.
     *
     * @private
     * @type {Object}
     */
    var currentBlueprint = null;

    /**
     * Private variable to track editing mode.
     * True when creating a new blueprint, false when editing existing one.
     *
     * @private
     * @type {boolean}
     */
    var isNewBlueprint = false;

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
     * Also sets up the canvas for editing by enabling click events.
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

            // Store current blueprint for editing
            currentBlueprint = blueprint;
            isNewBlueprint = false;

            // Show canvas section and update the current blueprint display
            $("#canvasContainer").show();
            $("#currentBlueprintDisplay").text("Current blueprint: " + blueprint.name);

            // Set up canvas for editing
            setupCanvas();

            // Draw the blueprint
            redrawCanvas();

            // Show appropriate buttons
            $("#saveUpdateBtn").show();
            $("#deleteBtn").show();
        });
    };

    /**
     * Sets up the canvas element with event handlers and basic properties.
     * Configures click/pointer events for adding new points to the blueprint.
     *
     * @private
     */
    var setupCanvas = function () {
        var canvas = document.getElementById("blueprintCanvas");

        // Remove any existing event listeners
        canvas.replaceWith(canvas.cloneNode(true));
        canvas = document.getElementById("blueprintCanvas");

        // Add pointer event listeners for cross-platform compatibility
        canvas.addEventListener('pointerdown', function (event) {
            if (!currentBlueprint) {
                alert("Please select a blueprint first or create a new one.");
                return;
            }

            // Get canvas coordinates
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            // Add point to current blueprint
            if (!currentBlueprint.points) {
                currentBlueprint.points = [];
            }

            currentBlueprint.points.push({ x: Math.round(x), y: Math.round(y) });

            // Redraw canvas with new point
            redrawCanvas();

            // Update total points in the table if blueprint is currently displayed
            updateBlueprintPointsInTable();
        });

        // Add mouse event fallback for older browsers
        canvas.addEventListener('click', function (event) {
            // Only handle if pointer events are not supported
            if (!window.PointerEvent) {
                if (!currentBlueprint) {
                    alert("Please select a blueprint first or create a new one.");
                    return;
                }

                var rect = canvas.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;

                if (!currentBlueprint.points) {
                    currentBlueprint.points = [];
                }

                currentBlueprint.points.push({ x: Math.round(x), y: Math.round(y) });
                redrawCanvas();
                updateBlueprintPointsInTable();
            }
        });
    };

    /**
     * Redraws the canvas with the current blueprint points.
     * Clears the canvas and draws all points as connected line segments.
     *
     * @private
     */
    var redrawCanvas = function () {
        var canvas = document.getElementById("blueprintCanvas");
        var ctx = canvas.getContext("2d");

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!currentBlueprint || !currentBlueprint.points || currentBlueprint.points.length === 0) {
            return;
        }

        // Set drawing properties
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Draw the blueprint points as connected lines
        ctx.beginPath();

        // Move to the first point
        ctx.moveTo(currentBlueprint.points[0].x, currentBlueprint.points[0].y);

        // Draw lines to subsequent points
        for (var i = 1; i < currentBlueprint.points.length; i++) {
            ctx.lineTo(currentBlueprint.points[i].x, currentBlueprint.points[i].y);
        }

        ctx.stroke();

        // Draw points as small circles for better visualization
        ctx.fillStyle = "#666";
        for (var j = 0; j < currentBlueprint.points.length; j++) {
            ctx.beginPath();
            ctx.arc(currentBlueprint.points[j].x, currentBlueprint.points[j].y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    };

    /**
     * Updates the point count for the current blueprint in the table.
     * Called when points are added to maintain UI consistency.
     *
     * @private
     */
    var updateBlueprintPointsInTable = function () {
        if (!currentBlueprint) return;

        // Find and update the row for the current blueprint
        $("#blueprintsTableBody tr").each(function () {
            var blueprintName = $(this).find("td:first").text();
            if (blueprintName === currentBlueprint.name) {
                var pointCount = currentBlueprint.points ? currentBlueprint.points.length : 0;
                $(this).find("td:nth-child(2)").text(pointCount);

                // Update total points
                var totalPoints = 0;
                $("#blueprintsTableBody tr").each(function () {
                    var points = parseInt($(this).find("td:nth-child(2)").text()) || 0;
                    totalPoints += points;
                });

                $("#totalPointsDisplay").text("Total user points: " + totalPoints);
                return false; // Break the loop
            }
        });
    };

    /**
     * Saves or updates the current blueprint using promises.
     * Handles both new blueprint creation and existing blueprint updates.
     *
     * @public
     */
    var saveOrUpdateBlueprint = function () {
        if (!currentBlueprint) {
            alert("No blueprint selected to save.");
            return;
        }

        if (!currentBlueprint.points || currentBlueprint.points.length === 0) {
            alert("Cannot save an empty blueprint. Please add some points first.");
            return;
        }

        var savePromise;

        if (isNewBlueprint) {
            // Create new blueprint
            savePromise = new Promise(function (resolve, reject) {
                api.createBlueprint(currentBlueprint, function (success, data) {
                    if (success) {
                        console.log("Blueprint created successfully");
                        resolve(data);
                    } else {
                        reject(new Error("Failed to create blueprint"));
                    }
                });
            });
        } else {
            // Update existing blueprint
            savePromise = new Promise(function (resolve, reject) {
                api.updateBlueprint(currentBlueprint.author, currentBlueprint.name, currentBlueprint, function (success, data) {
                    if (success) {
                        console.log("Blueprint updated successfully");
                        resolve(data);
                    } else {
                        reject(new Error("Failed to update blueprint"));
                    }
                });
            });
        }

        savePromise
            .then(function () {
                // Step 2: Refresh the blueprints list
                return new Promise(function (resolve, reject) {
                    api.getBlueprintsByAuthor(currentAuthor, function (blueprints) {
                        if (blueprints) {
                            resolve(blueprints);
                        } else {
                            reject(new Error("Failed to refresh blueprints"));
                        }
                    });
                });
            })
            .then(function (blueprints) {
                // Step 3: Update the UI with refreshed data
                updateUIWithBlueprints(blueprints);

                // Reset new blueprint flag
                isNewBlueprint = false;

                alert("Blueprint saved successfully!");
            })
            .catch(function (error) {
                console.error("Error in save/update operation:", error);
                alert("Error saving blueprint: " + error.message);
            });
    };

    /**
     * Creates a new blueprint by clearing the canvas and prompting for name.
     *
     * @public
     */
    var createNewBlueprint = function () {
        if (!currentAuthor) {
            alert("Please select an author first by searching for blueprints.");
            return;
        }

        var blueprintName = prompt("Enter the name for the new blueprint:");
        if (!blueprintName || blueprintName.trim() === "") {
            return;
        }

        blueprintName = blueprintName.trim();

        // Create new blueprint object
        currentBlueprint = {
            author: currentAuthor,
            name: blueprintName,
            points: []
        };

        isNewBlueprint = true;

        // Show canvas and setup for editing
        $("#canvasContainer").show();
        $("#currentBlueprintDisplay").text("Current blueprint: " + blueprintName + " (NEW)");

        // Setup canvas and clear it
        setupCanvas();
        redrawCanvas();

        // Show save button, hide delete button
        $("#saveUpdateBtn").show();
        $("#deleteBtn").hide();

        alert("New blueprint created. Click on the canvas to add points, then save when ready.");
    };

    /**
     * Deletes the current blueprint using promises.
     *
     * @public
     */
    var deleteCurrentBlueprint = function () {
        if (!currentBlueprint || isNewBlueprint) {
            alert("No blueprint selected to delete or blueprint is new.");
            return;
        }

        var confirmDelete = confirm("Are you sure you want to delete the blueprint '" +
            currentBlueprint.name + "' by " + currentBlueprint.author + "?");
        if (!confirmDelete) {
            return;
        }

        // Step 1: Delete blueprint
        var deletePromise = new Promise(function (resolve, reject) {
            api.deleteBlueprint(currentBlueprint.author, currentBlueprint.name, function (success, data) {
                if (success) {
                    console.log("Blueprint deleted successfully");
                    resolve(data);
                } else {
                    reject(new Error("Failed to delete blueprint"));
                }
            });
        });

        deletePromise
            .then(function () {
                // Step 2: Clear canvas
                clearCanvas();

                // Step 3: Refresh blueprints list
                return new Promise(function (resolve, reject) {
                    api.getBlueprintsByAuthor(currentAuthor, function (blueprints) {
                        if (blueprints) {
                            resolve(blueprints);
                        } else {
                            // If no blueprints left, resolve with empty array
                            resolve([]);
                        }
                    });
                });
            })
            .then(function (blueprints) {
                // Step 4: Update UI
                if (blueprints.length > 0) {
                    updateUIWithBlueprints(blueprints);
                    $("#actionButtons").show();
                } else {
                    // No blueprints left for this author
                    $("#blueprintsTableBody").empty();
                    $("#authorNameDisplay").text("No blueprints found for author: " + currentAuthor);
                    $("#totalPointsDisplay").text("");
                    $("#canvasContainer").hide();
                    $("#actionButtons").show();
                    $("#createNewBtn").show();
                }

                alert("Blueprint deleted successfully!");
            })
            .catch(function (error) {
                console.error("Error in delete operation:", error);
                alert("Error deleting blueprint: " + error.message);
            });
    };

    /**
     * Clears the canvas and resets current blueprint state.
     *
     * @private
     */
    var clearCanvas = function () {
        var canvas = document.getElementById("blueprintCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        currentBlueprint = null;
        isNewBlueprint = false;

        $("#currentBlueprintDisplay").text("");
        $("#saveUpdateBtn").hide();
        $("#deleteBtn").hide();
        $("#createNewBtn").show();
    };

    /**
     * Updates the UI with a fresh list of blueprints.
     * Extracted from updateBlueprintsByAuthor for reuse.
     *
     * @private
     * @param {Array} blueprints - Array of blueprint objects
     */
    var updateUIWithBlueprints = function (blueprints) {
        // Transform blueprints to objects with name and number of points
        currentBlueprints = blueprints.map(function (blueprint) {
            return {
                name: blueprint.name,
                points: blueprint.points.length
            };
        });

        // Clear existing table rows
        $("#blueprintsTableBody").empty();

        // Show table container and display author name
        $("#tableContainer").show();
        $("#authorNameDisplay").text(currentAuthor + "'s blueprints:");

        // Add each blueprint as a row in the table
        currentBlueprints.map(function (blueprint) {
            var row = "<tr>" +
                "<td>" + blueprint.name + "</td>" +
                "<td>" + blueprint.points + "</td>" +
                "<td><button class='blueprint-btn' " +
                "onclick=\"app.drawBlueprint('" + currentAuthor + "', '" + blueprint.name + "')\">" +
                "Open" +
                "</button></td>" +
                "</tr>";

            $("#blueprintsTableBody").append(row);
        });

        // Calculate total points using reduce
        var totalPoints = currentBlueprints.reduce(function (accumulator, blueprint) {
            return accumulator + blueprint.points;
        }, 0);

        // Update the total points display
        $("#totalPointsDisplay").text("Total user points: " + totalPoints);
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
                $("#actionButtons").show();
                $("#createNewBtn").show();
                $("#saveUpdateBtn").hide();
                $("#deleteBtn").hide();
                currentBlueprints = [];
                return;
            }

            updateUIWithBlueprints(blueprints);
            $("#actionButtons").show();
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

        // Attach click event to the "Save/Update" button
        $("#saveUpdateBtn").click(function () {
            saveOrUpdateBlueprint();
        });

        // Attach click event to the "Create new blueprint" button
        $("#createNewBtn").click(function () {
            createNewBlueprint();
        });

        // Attach click event to the "DELETE" button
        $("#deleteBtn").click(function () {
            deleteCurrentBlueprint();
        });
    };

    return {
        setCurrentAuthor: setCurrentAuthor,
        getCurrentAuthor: getCurrentAuthor,
        updateBlueprintsByAuthor: updateBlueprintsByAuthor,
        drawBlueprint: drawBlueprint,
        saveOrUpdateBlueprint: saveOrUpdateBlueprint,
        createNewBlueprint: createNewBlueprint,
        deleteCurrentBlueprint: deleteCurrentBlueprint,
        init: init
    };

})();


// Initialize the application when DOM is ready
$(document).ready(function () {
    app.init();
});
