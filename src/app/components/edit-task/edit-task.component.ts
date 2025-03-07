import { Component, inject, input, OnInit, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DateUtils } from '../../../services/date-utils';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TaskFormType, TaskType } from '../../../types/task';

@Component({
  selector: 'edit-task',
  imports: [ButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  readonly dateUtils = inject(DateUtils);
  minDate = this.dateUtils.formatDate(new Date());

  task = input<TaskType>();

  readonly formBuilder = inject(FormBuilder);
  editTaskForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['Mid', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
  });

  ngOnInit(): void {
    console.log(this.dateUtils.formatTime(this.task()?.dueDate!));
    this.editTaskForm.patchValue({
      title: this.task()?.title!,
      description: this.task()?.description!,
      priority: this.task()?.priority!,
      date: this.dateUtils.formatDate(this.task()?.dueDate!),
      time: this.dateUtils.formatTime(this.task()?.dueDate!),
    });
  }

  onEditTask = output<TaskFormType>();
  onSubmit() {
    if (!this.editTaskForm.valid) {
      return;
    }

    this.onEditTask.emit(this.editTaskForm.value);
    this.editTaskForm.reset();
  }

  onCancel = output<void>();
  handleCancel() {
    this.onCancel.emit();
  }
}
