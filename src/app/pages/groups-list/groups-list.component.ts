import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/groups.service';
import { CommonModule } from '@angular/common';
import { MenuButtonsComponent } from '../../components/menu/menu-buttons.components';
import { GroupCardComponent } from '../../components/group-card/group-card.component';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [GroupCardComponent, GroupsListComponent, CommonModule, MenuButtonsComponent],
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
