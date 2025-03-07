import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DateUtils } from '../../../services/date-utils';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TaskFormType } from '../../../types/task';

@Component({
  selector: 'add-task',
  imports: [ButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  readonly dateUtils = inject(DateUtils);
  minDate = this.dateUtils.formatDate(new Date());

  readonly formBuilder = inject(FormBuilder);
  newTaskForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['Mid', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
  });

  onAddTask = output<TaskFormType>();
  onSubmit() {
    if (!this.newTaskForm.valid) {
      return;
    }

    this.onAddTask.emit(this.newTaskForm.value);
    this.newTaskForm.reset();
  }

  onCancel = output<void>();
  handleCancel() {
    this.onCancel.emit();
  }
}
