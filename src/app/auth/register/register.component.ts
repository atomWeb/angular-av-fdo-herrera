import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private formSubmitted: boolean = false;

  public registerForm = this.fb.group(
    {
      username: ['cristian', [Validators.required, Validators.minLength(3)]],
      email: ['michin@atom.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      password2: ['123456', [Validators.required, Validators.minLength(6)]],
      terms: [true, [Validators.required]],
    },
    {
      validators: this.checkEqPasswords('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  createUser(): void {
    this.formSubmitted = true;
    // console.log(this.registerForm.value);

    this.userService.createUser(this.registerForm.value).subscribe(
      (resp) => {
        // Navegar al dashboard
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.error, 'error');
      }
    );
  }

  invalidField(field: string): boolean {
    return this.registerForm.get(field)!.invalid && this.formSubmitted;
  }

  checkUseTerms(): boolean {
    return !this.registerForm.get('terms')!.value && this.formSubmitted;
  }

  checkPasswords(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    return pass1 !== pass2 && this.formSubmitted;
  }

  checkEqPasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control === pass2Control) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ notEq: true });
      }
    };
  }
}
