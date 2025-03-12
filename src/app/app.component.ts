import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreService } from './store/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [StoreService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(public readonly storeService: StoreService) {
  }


  ngOnInit(): void {
    this.storeService.initStore();
  }

  title = 'store-test';


  click() {
    // this.storeService.setData('user', 'new user');
    // this.storeService.setData('token', 'jasdkfasj1234kjasj');
    this.storeService.select('user').subscribe((data) => {
      console.log(data);
    }
    );
  } 

 
}
