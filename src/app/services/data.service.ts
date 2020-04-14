import { Injectable } from "@angular/core";
import { Message } from "../models/message";
import { Observable } from "rxjs";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "angularfire2/firestore";

@Injectable({
  providedIn: "root",
})
export class DataService {
  allMessages: Observable<Message[]>;
  messageCollection: AngularFirestoreCollection<Message>; // pipeline to firebase DB

  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>("posts"); // initialize connection app -> firebase
  }

  retrieveMessagesFromDB() {
    this.allMessages = this.messageCollection.valueChanges();
  }

  public saveMessage(message) {
    var plain = Object.assign({}, message);
    this.messageCollection.add(plain);
  }

  public getAllMessages() {
    this.retrieveMessagesFromDB();
    return this.allMessages;
  }
}
