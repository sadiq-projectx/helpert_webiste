/**
 * Validation utility functions for form inputs
 * Based on Flutter validation code
 */

/**
 * Validates a username
 * @param value The username to validate
 * @returns Error message or undefined if valid
 */
export const validateUsername = (value: string): string | undefined => {
  const usernameRegExp = /^[a-zA-Z0-9_]+$/;
  if (!value) {
    return 'Please enter your username.';
  } else if (value.length < 6) {
    return 'Username should be at least 6 characters long.';
  } else if (value.length > 15) {
    return 'Username should not exceed 15 characters.';
  } else if (!usernameRegExp.test(value)) {
    return 'Invalid username. Only alphanumeric characters and underscores are allowed.';
  } else if (value.includes(' ')) {
    return 'Spaces are not allowed in the username.';
  }
  return undefined;
};

/**
 * Validates a first name
 * @param value The first name to validate
 * @returns Error message or undefined if valid
 */
export const validateFirstName = (value: string): string | undefined => {
  const numberRegExp = /[0-9]/;
  const specialCharRegExp = /[!@#$%^&*(),.?":{}|<>]/;
  const spaceRegExp = /\s/;

  if (!value) {
    return 'Please enter your first name.';
  } else if (numberRegExp.test(value)) {
    return 'Numbers are not allowed in the first name.';
  } else if (spaceRegExp.test(value)) {
    return 'Spaces are not allowed in the first name.';
  } else if (specialCharRegExp.test(value)) {
    return 'Special characters are not allowed in the first name.';
  } else if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
    return 'First name should start with a capital letter.';
  }
  return undefined;
};

/**
 * Validates an email address
 * @param value The email to validate
 * @returns Error message or undefined if valid
 */
export const validateEmail = (value: string): string | undefined => {
  if (!value) {
    return 'Please enter your email address.';
  }
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!pattern.test(value)) {
    return 'Please enter a valid email address.';
  }
  return undefined;
};

/**
 * Validates a password for login (only length check)
 * @param value The password to validate
 * @returns Error message or undefined if valid
 */
export const validateLoginPassword = (value: string): string | undefined => {
  if (!value) {
    return 'Please enter your password.';
  }
  if (value.length < 8) {
    return 'Password should be at least 8 characters long.';
  }
  return undefined;
};

/**
 * Validates a password for registration (length and number check)
 * @param value The password to validate
 * @returns Error message or undefined if valid
 */
export const validatePassword = (value: string): string | undefined => {
  if (!value) {
    return 'Please enter your password.';
  }
  if (value.length < 8) {
    return 'Password should be at least 8 characters long.';
  }
  const numberRegex = /[0-9]/;
  if (!numberRegex.test(value)) {
    return 'Password should contain at least one number.';
  }
  return undefined;
};

/**
 * Validates that confirm password matches password
 * @param value The confirm password to validate
 * @param password The original password to compare against
 * @returns Error message or undefined if valid
 */
export const validateConfirmPassword = (value: string, password: string): string | undefined => {
  if (!value) {
    return 'Please confirm your password.';
  }
  if (value !== password) {
    return 'Passwords do not match.';
  }
  return undefined;
};

/**
 * Validates a last name
 * @param value The last name to validate
 * @returns Error message or undefined if valid
 */
export const validateLastName = (value: string): string | undefined => {
  const numberRegExp = /[0-9]/;
  const specialCharRegExp = /[!@#$%^&*(),.?":{}|<>]/;
  const spaceRegExp = /\s/;

  if (!value) {
    return 'Please enter your last name.';
  } else if (numberRegExp.test(value)) {
    return 'Numbers are not allowed in the last name.';
  } else if (spaceRegExp.test(value)) {
    return 'Spaces are not allowed in the last name.';
  } else if (specialCharRegExp.test(value)) {
    return 'Special characters are not allowed in the last name.';
  } else if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
    return 'Last name should start with a capital letter.';
  }
  return undefined;
};

/**
 * Validates a mobile number
 * @param value The mobile number to validate
 * @returns Error message or undefined if valid
 */
export const validateMobileNumber = (value: string): string | undefined => {
  if (!value) {
    return 'Please enter your mobile number.';
  } else if (value.length !== 10) {
    return 'Please enter a valid 10-digit mobile number.';
  }
  return undefined;
};

/**
 * Validates a birthdate
 * @param value The birthdate to validate
 * @returns Error message or undefined if valid
 */
export const validateBirthdate = (value: string): string | undefined => {
  if (!value) {
    return 'Please select your birthdate.';
  }
  return undefined;
};

/**
 * Validates notes or questions
 * @param value The notes to validate
 * @returns Error message or undefined if valid
 */
export const validateNotes = (value: string): string | undefined => {
  if (!value) {
    return 'Please enter your question or problem.';
  } else if (value.length < 20) {
    return 'Question should be at least 20 characters long.';
  }
  return undefined;
};

/**
 * Validates if a value is a valid email
 * @param value The value to validate
 * @returns true if valid email, false otherwise
 */
export const isValidEmail = (value: string): boolean => {
  if (!value) {
    return false;
  }
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value);
};

/**
 * Validates if a field is empty
 * @param value The value to validate
 * @param fieldName The name of the field for the error message
 * @returns Error message or undefined if valid
 */
export const validateEmptyField = (value: string, fieldName: string): string | undefined => {
  if (!value) {
    return `Please select your ${fieldName}.`;
  }
  return undefined;
}; 