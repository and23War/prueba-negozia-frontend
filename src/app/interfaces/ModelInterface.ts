/**
  * Interface Structure to model class
  * @param updatedAt: Update Date
  * @param createdAt: Create Date
  * @param version: Version of logic table
  */
export interface ModelInterface {
  created?: Date;
  updated?: Date;
  version?: number;
}
