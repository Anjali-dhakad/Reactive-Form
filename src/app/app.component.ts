import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Reactive-form';
  registrationForm: FormGroup;
  formData: any;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('.*[A-Z].*'),
          Validators.pattern('.*[a-z].*'),
          Validators.pattern('.*[0-9].*'),
          Validators.pattern('.*[^A-Za-z0-9].*'),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.pattern('^[0-9]{10}$'),
        ],
      ],
      dateOfBirth: ['', [Validators.required, this.ageValidator]],
    });

    this.registrationForm.controls['confirmPassword'].setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this),
    ]);
  }
  passwordMatchValidator(control: any): { [key: string]: boolean } | null {
    if (this.registrationForm && this.registrationForm.controls['password'].value !== control.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  ageValidator(control: any): { [key: string]: boolean } | null {
    const dob = control.value;
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        return { underAge: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = { ...this.registrationForm.value };
      delete formData.password;
      this.formData = formData;
    }
  }

  onReset() {
    this.registrationForm.reset();
    this.formData = null;
  }
}
