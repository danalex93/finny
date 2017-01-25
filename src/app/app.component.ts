import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { SQLite } from 'ionic-native';

import { TabsPage } from '../app/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class FinnyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      let db = new SQLite();
      db.openDatabase({
          name: "data.db",
          location: "default"
      }).then(() => {
          db.executeSql("CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount INTEGER, date TEXT DEFAULT CURRENT_DATE);", {});
          db.executeSql("CREATE TABLE IF NOT EXISTS incomes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount INTEGER, date TEXT DEFAULT CURRENT_DATE);", {});
      }, (error) => {
          console.error("Unable to open database", error);
      });
    });
  }
}
