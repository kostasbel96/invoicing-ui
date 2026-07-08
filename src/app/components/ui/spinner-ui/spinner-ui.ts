import { Component, Input } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner-ui',
  imports: [ProgressSpinner],
  templateUrl: './spinner-ui.html',
  styleUrl: './spinner-ui.scss',
})
export class SpinnerUi {
  @Input() size: string = '50px';
}
