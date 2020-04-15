import { Injectable } from "@angular/core";
import { Message } from "../models/message";
import { Observable } from "rxjs";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "angularfire2/firestore";
import { Friend } from '../models/friend';

@Injectable({
  providedIn: "root",
})
export class DataService {
  allMessages: Observable<Message[]>;
  messageCollection: AngularFirestoreCollection<Message>; // pipeline to firebase DB

  allFriends: Observable<Friend[]>;
  friendCollection: AngularFirestoreCollection<Friend>; // pipeline to firebase DB

  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>("posts"); // initialize connection app -> firebase
    this.friendCollection = fb.collection<Friend>("friends"); // initialize connection app -> firebase
  }

  retrieveMessagesFromDB() {
    this.allMessages = this.messageCollection.valueChanges();
  }

  retrieveFriendsFromDB(){
    this.allFriends = this.friendCollection.valueChanges();
  }

  public saveMessage(message) {
    var plain = Object.assign({}, message);
    this.messageCollection.add(plain);
  }

  public getAllMessages() {
    this.retrieveMessagesFromDB();
    return this.allMessages;
  }

  public saveFriend(friend){
    var plain = Object.assign({}, friend);
    this.friendCollection.add(plain);
  }

  public getAllFriends(){
    this.retrieveFriendsFromDB();
    return this.allFriends;
  }
}
