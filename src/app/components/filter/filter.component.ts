import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../services/groups.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  arrUsers: any[] = [];
  name: any;

  constructor(@Inject(GroupService) private groupsService: GroupService) { }

  async getAllUsers(): Promise<void> {
    let response = await this.groupsService.getAllUsers();
    this.name = response[0].email;
  }
}
