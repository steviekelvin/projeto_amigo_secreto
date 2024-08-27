import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private successSubject = new Subject<string>();
  private errorSubject = new Subject<string>();

  public success$: Observable<string> = this.successSubject.asObservable();
  public error$: Observable<string> = this.errorSubject.asObservable();

  constructor(private messageService: MessageService) {}

  public showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
    });
    this.successSubject.next(message);
  }

  public showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
    });
    this.errorSubject.next(message);
  }
}
