import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-button',
  imports: [],
  templateUrl: './save-button.html',
  styleUrl: './save-button.scss',
})
export class SaveButton {
  @Input() currentForm: FormGroup;
  @Output() saveAction: EventEmitter<any> = new EventEmitter();
}
