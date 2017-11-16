import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PaylocityApi } from '../../services';

import { Employee } from '../../models';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styles: ['']
})
export class EmployeeEditComponent implements OnInit {
  item: Employee;
  form: FormGroup;

  constructor(private api: PaylocityApi, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!!params.id) {
        this.api.getEmployee(params.id).subscribe(employee => {
          this.item = employee;
        });
      }
      else {
        this.item = new Employee(null, "", "");
      }
      this.form = this.formBuilder.group({
        givenName: this.item.givenName,
        familyName: this.item.familyName
      });
    })
  }

  onSave() {
    this.item.givenName = this.form.value.givenName as string;
    this.item.familyName = this.form.value.familyName as string;
    this.api.saveEmployee(this.item);
    this.router.navigate(['employees']);
  }
}
