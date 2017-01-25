import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { ModalController, NavController, Platform, ViewController, AlertController } from 'ionic-angular';
import { AddExpenseModal } from './add-expense-modal';

export class Expense {
  constructor(
    public id: number,
    public name: string,
    public amount: number,
    public date: string
  ) {  }
}

@Component({
  selector: 'expenses-page',
  templateUrl: 'expenses.html'
})
export class ExpensesPage {

  public database: SQLite;
  public expenses: Array<Expense>;

  constructor(public navCtrl: NavController, private platform: Platform, private modalCtrl: ModalController, public alertCtrl: AlertController) {
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
    modal.onDidDismiss(() => {
      this.refresh();
    });
    modal.present();
  };

  public deleteExpense(id){
    let confirm = this.alertCtrl.create({
      title: '¿Realmente quieres borrar este registro?',
      message: 'Esta acción no se puede recuperar.',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.database.executeSql("DELETE FROM expenses WHERE id = ?", [ id ]).then(() => {
              this.refresh();
            })
          }
        }
      ]
    });
    confirm.present();
  };

  public getTotal(){
    var total = 0;
    if (this.expenses){
      for (var i = 0; i < this.expenses.length; i++){
        total += this.expenses[i].amount;
      }
    }
    return total;
  }

  public refresh(refresher = null) {
    this.database.executeSql("SELECT * FROM expenses", []).then((data) => {
      this.expenses = [];
      if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            this.expenses.push(
              new Expense(data.rows.item(i).id, data.rows.item(i).name, data.rows.item(i).amount, data.rows.item(i).date)
            );
          }
      }
      if (refresher != null) refresher.complete();
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error));
      if (refresher != null) refresher.complete();
    });
  }
};