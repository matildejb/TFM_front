import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.css'
})
export class GroupCardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() amount: number = 0;

amountColor: string = 'green';

ngOnChanges(changes: SimpleChanges) {
    if (changes['amount']) {
      this.amountColor = this['amount'] < 0 ? 'Crimson' : 'Limegreen';
    }
  }
}