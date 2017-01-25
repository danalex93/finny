import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'add-income-modal',
  templateUrl: 'add-income.html'
})
export class AddIncomeModal {
  public database: SQLite;

  public income;

  constructor(public modalCtrl: ModalController, private platform: Platform, public viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.income = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [''],
    });

    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {

      }, (error) => {
        console.log("ERROR: ", error);
      });
    });
  };

  public add() {
    var name = this.income.value.name;
    var amount = this.income.value.amount;
    this.database.executeSql("INSERT INTO incomes (name, amount) VALUES (?,?)", [name, amount]).then((data) => {
      this.viewCtrl.dismiss();
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error.err));
      alert("ERROR: " + JSON.stringify(error));
    });
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
