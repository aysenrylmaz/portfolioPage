import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { contactForm } from '../_models/contactForm';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  @Input() contactForm = {} as contactForm;

  constructor(private titleService: Title, private http: HttpClient) {
    this.titleService.setTitle('Aysenur YILMAZ-Contact');
  }

  onSubmit() {
    this.http.post('http://yourserver.com/contact', this.contactForm).subscribe(
      (response) => {
        console.log('Message sent successfully', response);
      },
      (error) => {
        console.log('Error sending message', error);
      }
    );
  }

  ngOnInit(): void {}
}
