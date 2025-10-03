/**
 * REST API client module for blueprint operations.
 * Provides real API communication with the Spring Boot backend.
 * Implements the same interface as apimock for seamless switching.
 *
 * @author Jesús Pinzón & David Velásquez
 * @version 1.0
 * @since 2025-10-02
 *
 * @module apiclient
 */
var apiclient = (function () {

  /**
   * Base URL for the REST API endpoints.
   *
   * @private
   * @constant {string}
   */
  var BASE_URL = "/blueprints";

  /**
   * Retrieves all blueprints for a given author from the REST API.
   *
   * @public
   * @param {string} authname - The author name to search for
   * @param {function} callback - Callback function that receives the blueprints array
   */
  var getBlueprintsByAuthor = function (authname, callback) {
    $.get({
      url: BASE_URL + "/" + authname,
      success: function (data) {
        console.log("Successfully retrieved blueprints for author: " + authname);
        callback(data);
      },
      error: function (xhr, status, error) {
        console.error("Error retrieving blueprints for author: " + authname);
        console.error("Status: " + status + ", Error: " + error);

        if (xhr.status === 404) {
          console.warn("No blueprints found for author: " + authname);
          callback(null);
        } else {
          alert("Error connecting to server. Please try again later.");
          callback(null);
        }
      }
    });
  };

  /**
   * Retrieves a specific blueprint by author and blueprint name from the REST API.
   *
   * @public
   * @param {string} authname - The author name
   * @param {string} bpname - The blueprint name
   * @param {function} callback - Callback function that receives the blueprint object
   */
  var getBlueprintsByNameAndAuthor = function (authname, bpname, callback) {
    $.get({
      url: BASE_URL + "/" + authname + "/" + bpname,
      success: function (data) {
        console.log("Successfully retrieved blueprint: " + bpname + " by " + authname);
        callback(data);
      },
      error: function (xhr, status, error) {
        console.error("Error retrieving blueprint: " + bpname + " by " + authname);
        console.error("Status: " + status + ", Error: " + error);

        if (xhr.status === 404) {
          console.warn("Blueprint not found: " + bpname + " by " + authname);
          callback(null);
        } else {
          alert("Error connecting to server. Please try again later.");
          callback(null);
        }
      }
    });
  };

  /**
   * Creates a new blueprint via POST request to the REST API.
   *
   * @public
   * @param {Object} blueprint - The blueprint object to create
   * @param {function} callback - Callback function that receives the result
   */
  var createBlueprint = function (blueprint, callback) {
    $.ajax({
      url: BASE_URL,
      type: 'POST',
      data: JSON.stringify(blueprint),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log("Successfully created blueprint: " + blueprint.name);
        callback(true, data);
      },
      error: function (xhr, status, error) {
        console.error("Error creating blueprint: " + blueprint.name);
        console.error("Status: " + status + ", Error: " + error);

        if (xhr.status === 409) {
          alert("Blueprint already exists: " + blueprint.name);
        } else {
          alert("Error creating blueprint. Please try again later.");
        }
        callback(false, null);
      }
    });
  };

  /**
   * Updates an existing blueprint via PUT request to the REST API.
   *
   * @public
   * @param {string} authname - The author name
   * @param {string} bpname - The blueprint name
   * @param {Object} blueprint - The updated blueprint object
   * @param {function} callback - Callback function that receives the result
   */
  var updateBlueprint = function (authname, bpname, blueprint, callback) {
    $.ajax({
      url: BASE_URL + "/" + authname + "/" + bpname,
      type: 'PUT',
      data: JSON.stringify(blueprint),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        console.log("Successfully updated blueprint: " + bpname);
        callback(true, data);
      },
      error: function (xhr, status, error) {
        console.error("Error updating blueprint: " + bpname);
        console.error("Status: " + status + ", Error: " + error);

        if (xhr.status === 404) {
          alert("Blueprint not found: " + bpname + " by " + authname);
        } else {
          alert("Error updating blueprint. Please try again later.");
        }
        callback(false, null);
      }
    });
  };

  // Public API - same interface as apimock
  return {
    getBlueprintsByAuthor: getBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
    createBlueprint: createBlueprint,
    updateBlueprint: updateBlueprint
  };

})();

/*
Example of use:
var fun = function(list) {
    console.info(list);
}

apiclient.getBlueprintsByAuthor("johnconnor", fun);
apiclient.getBlueprintsByNameAndAuthor("johnconnor", "house", fun);
*/