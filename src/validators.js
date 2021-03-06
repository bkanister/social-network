export const required = value => value ? undefined : 'Required';

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined