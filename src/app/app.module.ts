import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PatientMasterComponent } from './patient/patient-master/patient-master.component';
import { PatientAppointmentComponent } from './patient/patient-appointment/patient-appointment.component';
import { PatientHistoryComponent } from './patient/patient-history/patient-history.component';
import { PatientPersonalInfoComponent } from './patient/patient-personal-info/patient-personal-info.component';
import { PatientReportComponent } from './patient/patient-report/patient-report.component';
import { PatientSearchComponent } from './patient/patient-search/patient-search.component';
import { PatientTreatmentComponent } from './patient/patient-treatment/patient-treatment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PatientMasterComponent,
    PatientAppointmentComponent,
    PatientHistoryComponent,
    PatientPersonalInfoComponent,
    PatientReportComponent,
    PatientSearchComponent,
    PatientTreatmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
