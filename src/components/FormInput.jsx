import { useId } from 'react';

export default function FormInput({ label, error, hint, as = 'input', className = '', children, ...props }) {
  const id = useId();
  const Component = as;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={`form-field ${error ? 'form-field--error' : ''} ${className}`}>
      <label className="form-field__label" htmlFor={id}>
        {label}{props.required && <span aria-hidden="true"> *</span>}
      </label>
      <Component id={id} className="form-field__control" aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props}>
        {as === 'select' ? children : undefined}
      </Component>
      {error ? <p className="form-field__error" id={`${id}-error`} role="alert">{error}</p>
        : hint ? <p className="form-field__hint" id={`${id}-hint`}>{hint}</p> : null}
    </div>
  );
}