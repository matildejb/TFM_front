import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IMember } from '../../interfaces/imember';

@Component({
  selector: 'app-accordeon',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './accordeon.component.html',
  styleUrl: './accordeon.component.css'
  
})
export class AccordeonComponent {
  activePanel = -1;
  @Input() members: IMember[] = [];
  @Input() userPayments: { [userId: number]: any[] } = {}; // Cambiado a número
  



  ngOnInit(): void {
    console.log('members:', this.members);
    console.log('userPayments:', this.userPayments);
    
  }

  
}
