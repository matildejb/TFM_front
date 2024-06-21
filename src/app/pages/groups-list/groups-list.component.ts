import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/groups.service';
import { CommonModule } from '@angular/common';
import { GroupCardComponent } from '../../components/group-card/group-card.component';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [CommonModule, GroupCardComponent],
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {


  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
  }

}
