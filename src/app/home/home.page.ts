import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../services/meta-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public metaDataService: MetaDataService) {
    // Pass the title, description of the page
    this.metaData("Home Page", "Home Page Description", "");
  }

  ngOnInit() {

  }

  // Function to Set Meta Data for the Page. 
  // Helpful for SEO
  metaData(name: string, description: string, image: string) {
    this.metaDataService.setMetaData({
      title: name,
      description: description,
      image: image
    });
  }
}
