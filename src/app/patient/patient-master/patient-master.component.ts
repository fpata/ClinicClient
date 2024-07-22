import { Component, ViewChild } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from 'src/app/services/patient.service';
import { PatientPersonalInfoComponent } from '../patient-personal-info/patient-personal-info.component';

@Component({
  selector: 'app-patient-master',
  templateUrl: './patient-master.component.html',
  styleUrls: ['./patient-master.component.css']
})

export class PatientMasterComponent {

patient:Patient;
constructor(private patientService:PatientService){
 
}


ngOnInit()
{
  this.patient = this.patientService.getPatientById(2);
}
}
