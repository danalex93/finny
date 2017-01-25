import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'add-expense-modal',
  templateUrl: 'add-expense.html'
})
export class AddExpenseModal {
  public database: SQLite;

  public expense;

  constructor(public modalCtrl: ModalController, private platform: Platform, public viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.expense = this.formBuilder.group({
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
    var name = this.expense.value.name;
    var amount = this.expense.value.amount;
    this.database.executeSql("INSERT INTO expenses (name, amount) VALUES (?,?)", [name, amount]).then((data) => {
      this.viewCtrl.dismiss();
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error.err));
    });
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
