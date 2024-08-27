import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifyService } from './services/notify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Amigo Secreto Frontend';

  private successSubscription: Subscription = new Subscription();
  private errorSubscription: Subscription = new Subscription();

  constructor(private notifyService: NotifyService) {}

  ngOnInit(): void {
    this.successSubscription = this.notifyService.success$.subscribe(
      (message) => {
        // Lógica para lidar com mensagens de sucesso, se necessário
        console.log('Mensagem de sucesso:', message);
        // Você pode também usar a MessageService aqui se preferir
      }
    );

    this.errorSubscription = this.notifyService.error$.subscribe(
      (message) => {
        // Lógica para lidar com mensagens de erro, se necessário
        console.log('Mensagem de erro:', message);
        // Você pode também usar a MessageService aqui se preferir
      }
    );
  }

  ngOnDestroy(): void {
    // É importante cancelar a assinatura para evitar vazamentos de memória
    this.successSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
