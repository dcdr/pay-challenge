import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PChallengeApi } from '../../services';

import { Employee } from '../../models';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styles: ['']
})
export class EmployeeEditComponent implements OnInit {
  item: Employee;
  form: FormGroup;
  private isEditingDependent = false;

  constructor(private api: PChallengeApi, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({familyName: '', givenName: ''})
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!!params.id) {
        this.api.getEmployee(params.id).subscribe(employee => {
          this.item = employee;
          this.buildForm();
        });
      }
      else {
        this.item = new Employee(null, "", "", []);
        this.buildForm();
      }
    })
  }

  onEditingDependent(isEditingDependent) {
    this.isEditingDependent = isEditingDependent;
  }

  onSave() {
    this.item.givenName = this.form.value.givenName as string;
    this.item.familyName = this.form.value.familyName as string;
    this.api.saveEmployee(this.item);
    this.router.navigate(['employees']);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      givenName: this.item.givenName,
      familyName: this.item.familyName
    });
  }
}
