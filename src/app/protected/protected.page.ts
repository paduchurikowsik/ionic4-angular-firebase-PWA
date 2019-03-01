import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../services/meta-data.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.page.html',
  styleUrls: ['./protected.page.scss'],
})
export class ProtectedPage implements OnInit {

  constructor(public metaDataService: MetaDataService) {
    // Pass the title, description of the page
    this.metaData("Protected Page", "Protected Page Description", "");
  }

  ngOnInit() {

  }

  // Function to Set Meta Data for the Page. 
  // Helpful for SEO
  metaData(name: string, description: string, image: string) {
    this.metaDataService.setMetaData({
      title: name,
      description: description,
      image: image,
      url: window.location.href
    });
    this.metaDataService.createLinkForCanonicalURL();
  }

}
