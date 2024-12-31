import { NgxPaginationModule } from 'ngx-pagination';
import { UserDataService } from '../../services/user-data.service';
import { FbService } from '../../services/fb.service';
import { Component } from '@angular/core';
import {MatOption, MatOptionModule, provideNativeDateAdapter} from '@angular/material/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-club',
  styleUrl: './club.component.css',
  templateUrl: './club.component.html',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [NgxPaginationModule,RouterOutlet,RouterModule,MatButtonModule,MatIconModule,MatIcon,MatSelect,MatSelectModule,MatOption,MatOptionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubComponent{
  constructor(public u:UserDataService, public fb:FbService){}
  eliminaElemento(id:number){
    this.u.delete('clubs',id)
    this.u.updateRefOnEl(id,'clubs','students')
    this.u.updateRefOnEl(id,'clubs','professors')
  }
}