import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { LegalServiceComponent } from './legal-service.component';
import { ChoiceProgrammModule } from '../common/program-selection/program-selection.module';
import { UserFormModule } from '../common/user-form/user-form.module';

@NgModule({
  declarations: [
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    LegalServiceComponent
  ],
  imports: [
    CommonModule,
    ChoiceProgrammModule,
    UserFormModule
  ],
  exports: [
    ChoiceProgrammModule,
    UserFormModule,
    LegalServiceComponent
  ]
})
export class LegalServiceModule { }
