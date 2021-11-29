import React, { Fragment } from 'react';
import { ErrorMessage } from './ErrorMessage';

export interface TextFieldProps {
  /** used to make label and errorText accessible for screen readers */
  id?: string;

  /** used to create data-testid property on element for testing */
  testId?: string;

  /** passed directly to the input element */
  name?: string;

  /** the label content */
  label?: React.ReactNode;

  /** the input type (defaults to text) */
  type?: string;

  /** error text */
  error?: string;
}

export const TextField = ({
  id,
  testId,
  name,
  label,
  type = 'text',
  error,
}: TextFieldProps) => {
  return (
    <Fragment>
      {label !== undefined ? <label htmlFor={id}>{label}</label> : null}
      <input id={id} data-testid={testId} name={name} type={type} />
      <ErrorMessage error={error} />
    </Fragment>
  );
};
