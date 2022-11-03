import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { LegalServiceComponent } from './legal-service.component';
import { ProgramSelectionModule } from '../common/program-selection/program-selection.module';
import { UserFormModule } from '../common/user-form/user-form.module';
import { HeaderProductModule } from '../common/header-product/header-product.module';

@NgModule({
    declarations: [
        StepOneComponent,
        StepTwoComponent,
        StepThreeComponent,
        LegalServiceComponent
    ],
    imports: [
        CommonModule,
        HeaderProductModule,
        ProgramSelectionModule,
        UserFormModule
    ],
    exports: [
        ProgramSelectionModule,
        UserFormModule,
        LegalServiceComponent
    ]
})
export class LegalServiceModule { }
