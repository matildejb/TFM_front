import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent {
  	@Input() icon: string = '';
  	@Input() title: string = '';
	@Input() amount: number = 0;
	@Input() navigateTo: string = '';

	amountColor: string = 'green';

ngOnChanges(changes: SimpleChanges) {
    if (changes['amount']) {
      this.amountColor = this['amount'] < 0 ? 'Crimson' : 'Limegreen';
    }
  }
}