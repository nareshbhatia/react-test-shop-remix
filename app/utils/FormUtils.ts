import { ValidationError } from 'yup';

export type FormErrors = { [path: string]: string };

export function yupToFormErrors(yupError: ValidationError): FormErrors {
  let errors: FormErrors = {};

  for (let err of yupError?.inner) {
    // allow only the first error per path, ignore subsequent errors
    if (err.path && !errors.hasOwnProperty(err.path)) {
      errors[err.path] = err.message;
    }
  }

  return errors;
}
