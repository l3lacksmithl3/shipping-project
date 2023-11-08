import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CreateService } from '../service/create.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  datas:any;
  fname:any;
  email:any;
  pass:any;
  status:any;
  _id:any;

  constructor(private created:CreateService) { }

  ngOnInit(): void {
    this.get_data()
  }

  get_data(){
    this.created.get_member().subscribe((data: any) => {
      if (data) {
        this.datas = data
      }
    });
  }

  manage(subject:any){
    let date = new Date();
    // create update delete
    if(subject == 'create'){
      let body = {
        name : this.fname,
        email : this.email,
        pass : this.pass,
        status : 'user',
        date : date
      }
      this.created.create_member(body).subscribe((data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Create Member Success!!',
          showConfirmButton: false,
          timer: 1500,
        }).then(function () {    
        });
        this.ngOnInit();
        this.clear();
        window.location.reload()
      });
    }else if(subject == 'update'){
      let body = {
        name : this.fname,
        email : this.email,
        pass : this.pass,
        status : 'user',
        date : date,
        _id : this._id
      }      
      this.created.update_member(body).subscribe((data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Update Member Success!!',
          showConfirmButton: false,
          timer: 1500,
        }).then(function () {    
        });
        this.ngOnInit();
        window.location.reload()
      });
    }else{
      Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure you want to delete Name : "+' '+ subject.name +"?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Deleted?',
            text: "Your file has been deleted.",
            icon: 'success',
            showConfirmButton: false,
            timer: 1200
          })
        }
        this.delete(subject._id)
      })
    }
  }

  delete(id:any): void {   
    let body = {
      _id: id
    };    
    this.created.delete_member(body).subscribe((data: any) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }

  Test1(item:any){
    this.fname = item.name,
    this.email = item.email,
    this.pass = item.pass,
    this._id = item._id
  }

  clear(){
    this.fname = '',
    this.email = '',
    this.pass = ''
  }

}
