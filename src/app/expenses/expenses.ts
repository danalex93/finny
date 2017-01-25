import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { ModalController, NavController, Platform, ViewController } from 'ionic-angular';
import { AddExpenseModal } from './add-expense-modal';

@Component({
  selector: 'expenses-page',
  templateUrl: 'expenses.html'
})
export class ExpensesPage {

  public database: SQLite;
  public expenses: Array<Object>;

  constructor(public navCtrl: NavController, private platform: Platform, private modalCtrl: ModalController) {
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
      }, (error) => {
        console.log("ERROR: ", error);
      });
    });
  };

  public addExpense(){
    let modal = this.modalCtrl.create(AddExpenseModal);
    modal.present();
  };

  public delete(id){
    this.database.executeSql("DELETE FROM expenses WHERE id = ?", [ id ]).then(() => {
      this.refresh();
    })
  };

  public refresh() {
      this.database.executeSql("SELECT * FROM expenses", []).then((data) => {
          this.expenses = [];
          if(data.rows.length > 0) {
              for(var i = 0; i < data.rows.length; i++) {
                  this.expenses.push({name: data.rows.item(i).name, amount: data.rows.item(i).amount});
              }
          }
      }, (error) => {
          console.log("ERROR: " + JSON.stringify(error));
      });
  }
};