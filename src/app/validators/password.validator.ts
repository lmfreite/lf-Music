import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  
  if (!value) {
    return null; // Si está vacío, que lo maneje el validador required
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
  const isValidLength = value.length >= 12;

  const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

  if (!passwordValid) {
    return {
      passwordInvalid: {
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        isValidLength
      }
    };
  }
  
  return null;
}