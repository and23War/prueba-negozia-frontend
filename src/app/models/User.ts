/**
 * Interfaces
 */
import { ModelInterface } from '@interface/ModelInterface';

/**
 * Models
 */
import { PhoneType } from './PhoneType';

export interface User extends ModelInterface {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  sex?: string;
  password?: string;
  phone?: string;
  phoneTypeId?: number;
  phoneType?: PhoneType;
}
