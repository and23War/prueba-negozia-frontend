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
    email: {
      email: 'Correo electrónico inválido.',
      required: 'Campo requerido.',
      minlength: 'No es lo suficientemente larga, mínimo 6 caracteres.',
      maxlength: 'Es demasiado larga, máximo 255 caracteres.',
    },
    sex: {
      required: 'Campo requerido.'
    },
    phone: {
      required: 'Campo requerido.',
      minlength: 'No es lo suficientemente larga, mínimo 7 caracteres.',
      maxlength: 'Es demasiado larga, máximo 45 caracteres.',
    },
    phoneTypeId: {
      required: 'Campo requerido.'
    },
  },
  fields: {
    firstName: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)])],
    lastName: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100)])],
    email: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)])],
    sex: [null, Validators.compose([Validators.required])],
    phone: [null, Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(45)])],
    phoneTypeId: [null, Validators.compose([Validators.required])],
  }
};
