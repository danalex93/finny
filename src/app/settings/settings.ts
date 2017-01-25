import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage{
  public database: SQLite;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  };

  public clearDatabase(){
    let confirm = this.alertCtrl.create({
      title: '¿Realmente quieres limpiar los datos?',
      message: 'Esta acción eliminará todos los datos que has ingresado y no se podrán recuperar.',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.database = new SQLite();
            this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
              this.database.executeSql('DROP TABLE IF EXISTS expenses;', []);
              this.database.executeSql(' DROP TABLE IF EXISTS incomes;', []);
              this.database.executeSql("CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount INTEGER, date TEXT DEFAULT CURRENT_DATE);", {})
              this.database.executeSql("CREATE TABLE IF NOT EXISTS incomes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount INTEGER, date TEXT DEFAULT CURRENT_DATE);", {});
            }, (error) => {
              console.log("ERROR: ", error);
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
