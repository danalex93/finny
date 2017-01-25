import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { ModalController, NavController, Platform, ViewController, AlertController } from 'ionic-angular';
import { AddIncomeModal } from './add-income-modal';

export class Income {
  constructor(
    public id: number,
    public name: string,
    public amount: number,
    public date: string
  ) {  }
}

@Component({
  selector: 'incomes-page',
  templateUrl: 'incomes.html'
})
export class IncomesPage {

  public database: SQLite;
  public incomes: Array<Income>;

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

  public addIncome(){
    let modal = this.modalCtrl.create(AddIncomeModal);
    modal.onDidDismiss(() => {
      this.refresh();
    });
    modal.present();
  };

  public deleteIncome(id){
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
            this.database.executeSql("DELETE FROM incomes WHERE id = ?", [ id ]).then(() => {
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
    if (this.incomes){
      for (var i = 0; i < this.incomes.length; i++){
        total += this.incomes[i].amount;
      }
    }
    return total;
  }

  public refresh(refresher = null) {
    this.database.executeSql("SELECT * FROM incomes", []).then((data) => {
      this.incomes = [];
      if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            this.incomes.push(
              new Income(data.rows.item(i).id, data.rows.item(i).name, data.rows.item(i).amount, data.rows.item(i).date)
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