package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.exceptions.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.exceptions.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class that provides business logic for blueprint management
 * operations.
 * This class acts as an intermediary between the presentation layer and the
 * persistence layer,
 * implementing the service layer pattern for blueprint-related functionality.
 *
 * Note: Filtering has been disabled to preserve user's interactive drawing points
 * in Part II of the application.
 *
 * @author Jesús Pinzón & David Velásquez
 * @version 1.0
 * @since 2025-09-12
 */
@Service
public class BlueprintsServices {

  @Autowired
  private BlueprintsPersistence blueprintsPersistence;

  /**
   * Sets the blueprint persistence implementation (used for testing without
   * Spring context).
   *
   * @param blueprintsPersistence the persistence implementation to set
   */
  public void setBlueprintsPersistence(BlueprintsPersistence blueprintsPersistence) {
    this.blueprintsPersistence = blueprintsPersistence;
  }

  /**
   * Registers a new blueprint in the system.
   *
   * @param blueprint the blueprint to be added
   * @throws BlueprintPersistenceException if the blueprint already exists or a
   *                                       persistence error occurs
   */
  public void addNewBlueprint(Blueprint blueprint) throws BlueprintPersistenceException {
    blueprintsPersistence.saveBlueprint(blueprint);
  }

  /**
   * Retrieves all blueprints stored in the system without filtering.
   * Filtering disabled to preserve user's interactive drawing points.
   *
   * @return a set containing all blueprints
   */
  public Set<Blueprint> getAllBlueprints() {
    return blueprintsPersistence.getAllBlueprints();
  }

  /**
   * Retrieves a specific blueprint by its author and name without filtering.
   * Filtering disabled to preserve user's interactive drawing points.
   *
   * @param author the blueprint's author
   * @param name   the blueprint's name
   * @return the blueprint matching the specified criteria
   * @throws BlueprintNotFoundException if no blueprint is found with the given
   *                                    parameters
   */
  public Blueprint getBlueprint(String author, String name) throws BlueprintNotFoundException {
    return blueprintsPersistence.getBlueprint(author, name);
  }

  /**
   * Retrieves all blueprints created by a specific author without filtering.
   * Filtering disabled to preserve user's interactive drawing points.
   *
   * @param author the blueprint author to search for
   * @return a set containing all blueprints by the specified author
   * @throws BlueprintNotFoundException if no blueprints are found for the given
   *                                    author
   */
  public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
    return blueprintsPersistence.getBlueprintsByAuthor(author);
  }

  /**
   * Updates an existing blueprint in the system.
   *
   * @param blueprint the blueprint to be updated
   * @throws BlueprintNotFoundException    if the blueprint to update doesn't
   *                                       exist
   * @throws BlueprintPersistenceException if any persistence error occurs
   */
  public void updateBlueprint(Blueprint blueprint) throws BlueprintNotFoundException, BlueprintPersistenceException {
    blueprintsPersistence.updateBlueprint(blueprint);
  }

  /**
   * Deletes an existing blueprint from the system.
   *
   * @param author        the author of the blueprint to delete
   * @param blueprintName the name of the blueprint to delete
   * @throws BlueprintNotFoundException    if the blueprint to delete doesn't
   *                                       exist
   * @throws BlueprintPersistenceException if any persistence error occurs
   */
  public void deleteBlueprint(String author, String blueprintName)
      throws BlueprintNotFoundException, BlueprintPersistenceException {
    blueprintsPersistence.deleteBlueprint(author, blueprintName);
  }
}
