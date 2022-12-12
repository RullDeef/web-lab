import { Component, Input } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {

  @Input() user!: User;

  constructor(
    private logger: NGXLogger,
  ) { }
}
