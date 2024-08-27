import { Component, OnInit } from '@angular/core';
import { PersonsService } from '../../services/persons.service';
import { Router } from '@angular/router';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  constructor(
    private personsService: PersonsService,
    private router: Router,
    private notifyService: NotifyService
  ) {}
  public personsData: any[] = [];
  public filterPersons: string = '';
  public filteredPersons: any[] = [];

  ngOnInit() {
    this.getPersons();
  }

  getPersons = () => {
    this.personsService.getPersons().subscribe((response) => {
      this.personsData = response.data;
      this.filteredPersons = response.data;
    });
  };

  changeFilter = () => {
    if (this.filterPersons === '') {
      this.filteredPersons = this.personsData;
      return;
    }
    this.filteredPersons = this.personsData.filter(
      (personData) =>
        personData.person.name
          .toLowerCase()
          .includes(this.filterPersons.toLowerCase()) ||
        personData.person.email
          .toLowerCase()
          .includes(this.filterPersons.toLowerCase())
    );
  };

  drawSecretFriend = () => {
    this.personsService.change().subscribe(
      (response) => {
        this.notifyService.showSuccess('Sorteio realizado com sucesso');
        this.getPersons();
      },
      (error) => {
        this.notifyService.showError(error.error.message);
      }
    );
  };

  clear = () => {
    this.personsService.clear().subscribe(
      (response) => {
        this.notifyService.showSuccess('Sorteio limpo com sucesso');
        this.getPersons();
      },
      (error) => {
        console.log('error', error);
        this.notifyService.showError(error.error.message);
      }
    );
  };

  edit = (personData: any) => {
    console.log(personData.person.id);
    this.router.navigate(['/edit'], { state: { personData: personData } });
  };

  delete = (personData: any) => {
    this.personsService.deletePerson(personData.person.id).subscribe(
      (response) => {
        this.personsService.clear();
        this.notifyService.showSuccess('Pessoa deletada com sucesso');
        this.getPersons();
      },
      (error) => {
        console.log('error', error);
        this.notifyService.showError('Erro ao deletar pessoa');
      }
    );
  };

  register = () => {
    this.router.navigate(['/register']);
  };
}
