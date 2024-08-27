import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Início',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/home']);
        },
      },
      {
        label: 'Cadastrar',
        icon: 'pi pi-pencil',
        command: () => {
          this.router.navigate(['/register']);
        },
      },
    ];
  }
}
