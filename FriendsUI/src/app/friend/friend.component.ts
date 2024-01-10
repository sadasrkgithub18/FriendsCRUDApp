import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Friend } from '../models/friend.model';
import { FormBuilder, NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

 httpClient:HttpClient
 friends:Friend[] = [];

 closeResult:String ="";
 
 editForm!:FormGroup;

deleteId:number=0;

constructor(httpClient:HttpClient,private modalService: NgbModal, private fb:FormBuilder){
this.httpClient = httpClient;
}

ngOnInit():void{
this.getFriends();

this.editForm = this.fb.group({
  id: [''],
  firstName: [''],
  lastName: [''],
  department: [''],
  email: [''],
  country: ['']
} );

}
  getFriends(){
    this.httpClient.get<any>('http://localhost:8080/friendsapi/friends').subscribe(
      response => {
        console.log(response);
        this.friends = response;
      }
    );


  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/friendsapi/friends/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        console.log(f.value);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal: any, friend: Friend) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  
    // Perform null checks before setting attributes
    const fnameElement = document.getElementById('fname');
    const lnameElement = document.getElementById('lname');
    const deptElement = document.getElementById('dept');
    const emailElement = document.getElementById('email');
    const countryElement = document.getElementById('country');
  
    if (fnameElement) {
      fnameElement.setAttribute('value', friend.firstName);
    }
  
    if (lnameElement) {
      lnameElement.setAttribute('value', friend.lastName);
    }
  
    if (deptElement) {
      deptElement.setAttribute('value', friend.department);
    }
  
    if (emailElement) {
      emailElement.setAttribute('value', friend.email);
    }
  
    if (countryElement) {
      countryElement.setAttribute('value', friend.country);
    }
  }
  

  openEdit(targetModal: any, friend: Friend) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  
    // Perform null checks before patching form values
    if (this.editForm) {
      this.editForm.patchValue({
        id: friend.id, 
        firstName: friend.firstName,
        lastName: friend.lastName,
        department: friend.department,
        email: friend.email,
        country: friend.country
      });
      console.log(this.editForm);
    } else {
      console.error('editForm is null or undefined.');
    }
  }
  
  onSave() {
    const editURL = 'http://localhost:8080/friendsapi/friends/' + this.editForm.value.id + '/edit';
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  openDelete(targetModal: any, friend: Friend) {
    this.deleteId = friend.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete() {
    const deleteURL = 'http://localhost:8080/friendsapi/friends/' + this.deleteId + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
  

}

