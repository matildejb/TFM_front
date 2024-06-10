import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {
  groupId: number = 0;

  constructor(private route: ActivatedRoute) { }
  
  ngOninit() {
    this.route.params.subscribe(params => {
      this.groupId = +params['id'];
    });
  }
}
