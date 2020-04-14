import { Component } from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  displayMessage: Message[];
  constructor(private data: DataService) {
    data.getAllMessages().subscribe((list) => {
      console.log("obs emited value");
      this.displayMessage = list;
    });
  }
}
