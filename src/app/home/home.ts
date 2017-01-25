import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  public database: SQLite;
  public income_total: number;
  public expense_total: number;

  constructor(public navCtrl: NavController, private platform: Platform) {
    this.platform.ready().then(() => {
      this.income_total = 0;
      this.expense_total = 0;

      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
      }, (error) => {
        console.log("ERROR: ", error);
      });
    });
  }

  public refresh(refresher = null){
    this.income_total = 0;
    this.database.executeSql("SELECT * FROM incomes", []).then((data) => {
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          this.income_total += data.rows.item(i).amount;
        }
      }
    });

    this.expense_total = 0;
    this.database.executeSql("SELECT * FROM expenses", []).then((data) => {
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          this.expense_total += data.rows.item(i).amount;
        }
      }
    });

    if (refresher != null) refresher.complete();
  }

}
