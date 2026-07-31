import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  imports: [],
  templateUrl: './reset-button.html',
  styleUrl: './reset-button.scss',
})
export class ResetButton {
  @Output() resetAction = new EventEmitter();
}
