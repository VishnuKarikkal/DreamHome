import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UsersService} from '../users.service';
  import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public user:UsersService) { }

  ngOnInit(): void {
  }

}
