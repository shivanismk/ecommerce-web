import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
// import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router'
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  error = '';
  url: string | any;

  myform: any;
  constructor(private fb: FormBuilder,
    private registerservice: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myform = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]],
      lname: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      phone: ['', [Validators.required]],
      url: [null, [Validators.required]]

    })
  }

  get f() {
    return this.myform.controls;
  }


  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {
     const file = event.target.files[0];
      this.myform.patchValue({
        url: file
      });
    }
  }

  onSubmit(formDirective: FormGroupDirective): void {
    console.log(this.myform.value);
    this.submitted = true;
    // stop here if form is invalid
    if (this.myform.invalid) {
      return;
    }


    console.log(this.myform.value);
    const formData = new FormData();

    formData.append('url', this.myform.get('url').value);
    formData.append('fname', this.myform.get('fname').value);
    formData.append('lname', this.myform.get('lname').value);
    formData.append('email', this.myform.get('email').value);
    formData.append('password', this.myform.get('password').value);
    formData.append('phone', this.myform.get('phone').value);

    this.registerservice.registeruser(formData).subscribe
      ({
        next: (result: any) => {
          console.log(result);
          localStorage.setItem('token', result.accessToken)
          this.router.navigate(['/login'])

          Swal.fire({
            title: 'Registered!',
            text: 'Register user successfully',
            icon: 'success',
            confirmButtonText: 'Woow'
          });

        },
        error:(e: any)=> {},
        complete: () => { }
     } )
  }
}
