import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-button',
  imports: [],
  templateUrl: './cancel-button.html',
  styleUrl: './cancel-button.scss',
})
export class CancelButton {
  @Output() cancelAction = new EventEmitter();
}
