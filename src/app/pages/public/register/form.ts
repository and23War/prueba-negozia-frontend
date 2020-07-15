import { Validators } from '@angular/forms';

/**
 * Interfaces
 */
import { IControlField } from '@interface/IControlField';

export const controlField: IControlField = {
  messages: {
    firstName: {
      required: 'Campo requerido.',
      minlength: 'No es lo suficientemente larga, mínimo 6 caracteres.',
      maxlength: 'Es demasiado larga, máximo 100 caracteres.',
    },
    lastName: {
      required: 'Campo requerido.',
      minlength: 'No es lo suficientemente larga, mínimo 6 caracteres.',
      maxlength: 'Es demasiado larga, máximo 100 caracteres.',
    },
    sex: {
      required: 'Campo requerido.',
    },
    phoneTypeId: {
      required: 'Campo requerido.',
      minlength: 'No es lo suficientemente larga, mínimo 6 caracteres.',
      maxlength: 'Es demasiado larga, máximo 100 caracteres.',
    },
    phone: {
      required: 'Campo requerido.',
      minlength: 'No es lo suficientemente larga, mínimo 6 caracteres.',
      maxlength: 'Es demasiado larga, máximo 100 caracteres.',
    },
    email: {
      email: 'Correo electrónico inválido.',
      required: 'Campo requerido.',
      minlength: 'No es lo suficientemente larga, mínimo 6 caracteres.',
      maxlength: 'Es demasiado larga, máximo 255 caracteres.',
    },
    password: {
      required: 'Campo requerido.',
      minlength: 'No es lo suficientemente larga, mínimo 6 caracteres.',
      maxlength: 'Es demasiado larga, máximo 255 caracteres.',
    },
  },
  fields: {
    firstName: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)])],
    lastName: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)])],
    sex: [null, Validators.compose([Validators.required])],
    phoneTypeId: [null, Validators.compose([Validators.required])],
    phone: [null, Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(15)])],
    email: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)])],
    password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(255)])],
  },
};
