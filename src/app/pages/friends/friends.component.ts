  import { Component, inject } from '@angular/core';
    import { CommonModule, NgFor } from '@angular/common';
    import { UsersService } from '../../services/users.service';
    import { ActivatedRoute } from '@angular/router';
import { FriendCardComponent} from '../../components/friend-card/friend-card.component';
    
    @Component({
      selector: 'app-friends',
      standalone: true,
      imports: [FriendCardComponent,  CommonModule],
      templateUrl: './friends.component.html',
      styleUrl: './friends.component.css'
    })
    export class FriendsComponent {
      memberService = inject(UsersService);
    
    
      members: any[]= [];
      userId: string = '11';
      groupId: string= '18'
    
      ngOnInit(){
        this.memberService.getMembersByGroupId(this.groupId).subscribe((data: any[])=>{
          this.members = data;
          console.log(data)
        })
      }
    
        // ngOnInit(){
        //   const token = localStorage.getItem('token');
        //   console.log('Token:' , token);
        //     this.memberService.getAllMembersByUserId(this.userId).subscribe((data: any[])=>{
        //     this.members = data;
        //   }, error =>{
        //     console.error('Error al obtener los miembros', error);
        //   });
        // }
    
    }
    

   