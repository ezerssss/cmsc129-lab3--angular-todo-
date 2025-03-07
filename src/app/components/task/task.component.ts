import { Component, computed, input, output, signal } from '@angular/core';
import { TaskFormType, TaskType } from '../../../types/task';
import { twMerge } from 'tailwind-merge';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'task',
  imports: [EditTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task = input<TaskType>();
  priorityClass = computed(() =>
    twMerge(
      'rounded-xl text-white text-xs w-fit px-2',
      this.task()?.priority == 'High' && 'bg-red-500',
      this.task()?.priority == 'Mid' && 'bg-yellow-500',
      this.task()?.priority == 'Low' && 'bg-green-500'
    )
  );

  onDelete = output<string>();
  handleDelete() {
    this.onDelete.emit(this.task()!.id);
  }

  isEditing = signal(false);
  handleEditButton() {
    this.isEditing.update((val) => !val);
  }

  onEdit = output<{ id: string; formValues: TaskFormType }>();
  handleEdit(formValues: TaskFormType) {
    this.onEdit.emit({ id: this.task()!.id, formValues: formValues });
    this.isEditing.set(false);
  }
}
