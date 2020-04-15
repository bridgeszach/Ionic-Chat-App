import { Component } from '@angular/core';
import { Friend } from '../models/friend';
import { SharedService } from '../services/shared.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  friend: Friend = new Friend();
  myfriends: Friend[] = [];

  constructor(private shared: SharedService, private data: DataService) {
    this.data.getAllFriends().subscribe(list => {
      this.myfriends = [];
      for(let i = 0; i < list.length; i++){
        var f = list[i];
        if(f.belongsTo == this.shared.userName){
          this.myfriends.push(f);
        }
      }
    });
  }

  onSave(){
    this.friend.belongsTo = this.shared.userName;
    console.log(this.friend);

    this.data.saveFriend(this.friend);
  }
}
