import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { IncomesPage } from '../incomes/incomes';
import { ExpensesPage } from '../expenses/expenses';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = IncomesPage;
  tab3Root: any = ExpensesPage;

  constructor() {

  }
}
