import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonsService } from '../../services/persons.service';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  person: any;
  dataForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personsService: PersonsService,
    private notifyService: NotifyService
  ) {
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const person = history?.state?.personData?.person;
    if (person && person.id) {
      this.dataForm.patchValue({
        name: person.name,
        email: person.email,
      });
      this.dataForm.addControl('id', this.formBuilder.control(person.id));
    }
    this.person = person ?? null;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.dataForm.valid) {
      const personData = this.dataForm.value;
      if (personData.id) {
        this.updatePerson(personData);
      } else {
        this.createPerson(personData);
      }
    } else {
      this.notifyService.showError('Formulário inválido');
    }
  }

  private updatePerson(personData: any): void {
    this.personsService.updatePerson(personData.id, personData).subscribe(
      (response) => {
        this.notifyService.showSuccess('Pessoa atualizada com sucesso');
        this.router.navigate(['/home']);
      },
      (error) => {
        Object.keys(error.error).forEach((key) => {
          this.notifyService.showError(error.error[key]);
        });
      }
    );
  }

  private createPerson(personData: any): void {
    this.personsService.createPerson(personData).subscribe(
      (response) => {
        this.notifyService.showSuccess('Pessoa cadastrada com sucesso');
        this.router.navigate(['/home']);
      },
      (error) => {
        Object.keys(error.error).forEach((key) => {
          Object.keys(error.error[key]).forEach((message) => {
            this.notifyService.showError(error.error[key][message]);
          });
        });
      }
    );
  }

  goToHome = () => {
    this.router.navigate(['/home']);
  };
}
