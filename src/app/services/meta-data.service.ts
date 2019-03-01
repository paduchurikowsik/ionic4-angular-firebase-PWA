import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MetaDataService {

  // Service that handles that SEO for the pages
  // It sets meta tags for each page

  private appColor: '#1976d2';
  private appImage: '/assets/shapes.svg';
  private appTitle: 'Publication PWA';
  private appDescription: 'A place where you can find wide range of Novels and Stories';

  constructor(@Inject(DOCUMENT) private doc, private meta: Meta, private title: Title) { }

  public setMetaData(config) {
    const description = config.description || this.appDescription;
    const image = (config.image != "" || config.image != null) ? config.image : this.appImage;
    const title = config.title ? `${config.title}` : this.appTitle;
    this.title.setTitle(title);

    const tags = [
      { name: 'description', content: description },
      { name: 'theme-color', content: this.appColor },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:url', content: config.url },
      { name: 'twitter:image', content: image },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'white' },
      { name: 'apple-mobile-web-app-title', content: title },
      { name: 'apple-touch-startup-image', content: image },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: config.url },
      { property: 'og:type', content: "website" },
    ];

    tags.forEach(tag => this.meta.updateTag(tag));
  }

  createLinkForCanonicalURL() {
    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', this.doc.URL);
    console.log(link);
  }
}
