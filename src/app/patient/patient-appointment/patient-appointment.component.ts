import { Component, Input,OnInit, ViewChild, } from '@angular/core';
import { Patient, PatientAppointment } from '../patient';
import { CalendarComponent } from 'src/app/common/calendar/calendar.component';
import { CalendarEvent } from 'angular-calendar';
import { format, setDate,setHours,setMinutes, toDate } from 'date-fns';
import { colors } from 'src/app/common/calendar/color';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent {

@ViewChild(CalendarComponent ) calendar:CalendarComponent; 
@Input() appointments:PatientAppointment[];

constructor(){}

 
 CreateEvents(){
    var events:CalendarEvent[] = new Array<CalendarEvent>();
    var apptHours:number = 0;
    var apptMinutes:number =0; 
    var apptDate:Date =   new Date();
    var apptTitle:string= '';
    var splitTime:string[] =[];
    if(this.appointments.length > 0) {
    this.appointments?.forEach(
      (appt) => {
        splitTime =appt?.ApptTime?.split(":");
        apptHours =  Number.parseInt(splitTime[0]);
        apptMinutes= Number.parseInt(splitTime[1]);
        apptDate = toDate(Date.parse(appt.ApptDate));
        apptTitle = "Patient Name :" + appt.PatientName + ",  Doctor Name:"+ appt.DoctorName + ",  Treatment : "+appt.TreatmentName;
        ;
        events = [ ... events, {
        "title": apptTitle,
        "start":setHours(setMinutes(apptDate,apptMinutes),apptHours),
        "color":colors.blue,
       }];
      });
      if(events.length > 0 ){
      this.calendar.SetCalendarEvents(events);
      }
    }
  }

  ngOnChanges() {
    this.CreateEvents();
    }
    
    SaveAppointment() {
      var appointment:PatientAppointment = new PatientAppointment();
      var appointmentId = (document.getElementById('hdAppointmentId') as HTMLInputElement).value;
      var IsEdit:boolean = false;
      if(!(appointmentId == undefined || appointmentId == '')) {
        var ApptId =  Number.parseInt(appointmentId)
        appointment = this.appointments.find(x => x.Id == ApptId) as PatientAppointment;
        IsEdit = true;
      }
      else {
        appointment.Id = (Math.min(...this.appointments.map(x => x.Id)) + (-1));
      }
      var dtStringValue= (document.getElementById('txtAppointmentDate') as HTMLInputElement).value;
      if(dtStringValue == undefined || dtStringValue == ''){
        dtStringValue = format(Date.now(),'dd-MMM-yyyy');
      }else{
        dtStringValue = format(toDate(dtStringValue),'dd-MMM-yyyy');
      }
      
      appointment.ApptDate =  dtStringValue;
      appointment.ApptTime = (document.getElementById('txtAppointmentTime') as HTMLInputElement).value;
      appointment.DoctorName = (document.getElementById('txtApptDoctorName') as HTMLInputElement).value;
      appointment.TreatmentName =(document.getElementById('txtApptProcedure') as HTMLInputElement).value;
      if(!IsEdit){
        this.appointments.push(appointment);
      }
      (document.getElementById('hdAppointmentId') as HTMLInputElement).value = '';
      this.CreateEvents();
      }
      

      DeleteAppointment(AppointmentId: number) {
        var appointmentIndex = this.appointments.findIndex(x=> x.Id === AppointmentId);
        this.appointments.splice(appointmentIndex,1);
      }
        
      EditAppointment(appointmentId: number) {
          document.getElementById("addAppointmentModal")?.click();
       
          var appointment:PatientAppointment = this.appointments.find(x=> x.Id == appointmentId)  as PatientAppointment;
          (document.getElementById('hdAppointmentId') as HTMLInputElement).value = appointmentId.toString();
          var dtString = format(toDate(appointment.ApptDate),'yyyy-MM-dd');
          (document.getElementById('txtAppointmentDate') as HTMLInputElement).value = dtString;
          (document.getElementById('txtAppointmentTime') as HTMLInputElement).value = appointment.ApptTime ;
          (document.getElementById('txtApptDoctorName') as HTMLInputElement).value = appointment.DoctorName;
          (document.getElementById('txtApptProcedure') as HTMLInputElement).value = appointment.TreatmentName;      
        }
}




/*{
  title: 'No event end date',
  start: setHours(setMinutes(new Date(), 0), 3),
  color: colors.blue,
},
{
  title: 'No event end date',
  start: setHours(setMinutes(new Date(), 0), 5),
  color: colors.yellow,
}*/