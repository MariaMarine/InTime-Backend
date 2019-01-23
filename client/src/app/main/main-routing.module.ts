// import { TableReportsResolverService } from './reports/table-reports-resolver.service';
import { ReportsResolverService } from './reports/reports-resolver.service';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    resolve: { reports: ReportsResolverService
      // , tables: TableReportsResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}