import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { MatButtonModule, MatSidenavModule, MatListModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule, MatExpansionModule} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';


const MaterialComponents = [
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  ScrollingModule,
  MatExpansionModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
