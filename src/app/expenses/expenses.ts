import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { ModalController, NavController, Platform, ViewController, AlertController } from 'ionic-angular';
import { AddExpenseModal } from './add-expense-modal';

@Component({
  selector: 'expenses-page',
  templateUrl: 'expenses.html'
})
export class ExpensesPage {

  public database: SQLite;
  public expenses: Array<Object>;

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

  public refresh() {
    this.database.executeSql("SELECT * FROM expenses", []).then((data) => {
      this.expenses = [];
      if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
              this.expenses.push({id: data.rows.item(i).id, date: new Date(data.rows.item(i).date), name: data.rows.item(i).name, amount: data.rows.item(i).amount});
          }
      }
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error));
    });
  }
};