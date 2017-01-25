import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'

import { FinnyApp } from './app.component';
import { HomePage } from '../app/home/home';
import { IncomesPage } from '../app/incomes/incomes';
import { ExpensesPage } from '../app/expenses/expenses';
import { AddExpenseModal } from '../app/expenses/add-expense-modal';
import { SettingsPage } from '../app/settings/settings';
import { TabsPage } from '../app/tabs/tabs'

@NgModule({
  declarations: [
    FinnyApp,
    HomePage,
    IncomesPage,
    ExpensesPage,
    AddExpenseModal,
    SettingsPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(FinnyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FinnyApp,
    HomePage,
    IncomesPage,
    ExpensesPage,
    AddExpenseModal,
    SettingsPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})

export class AppModule {

}
