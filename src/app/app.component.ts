import { Component, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskFormType, TaskType } from '../types/task';
import { v4 as uuidv4 } from 'uuid';
import { TaskComponent } from './components/task/task.component';
import { mockTasks } from '../mock/tasks';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import Swal from 'sweetalert2';
import { DateUtils } from '../services/date-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    HeaderComponent,
    ButtonComponent,
    AddTaskComponent,
    TaskComponent,
    NgxSonnerToaster,
  ],
})
export class AppComponent {
  readonly dateUtils = inject(DateUtils);
  protected readonly toast = toast;

  showTaskAdder = signal(false);
  handleNewTaskButton() {
    this.showTaskAdder.set(true);
  }

  tasks = signal<TaskType[]>(mockTasks);
  sortedTasks = computed(() => this.handleSort());

  sortBy = signal<string>('Priority+');

  handleChangeSort(e: Event) {
    const event = e as any;
    this.sortBy.set(event.target.value);
  }

  handleSort() {
    const prioIndex = ['High', 'Mid', 'Low'];
    const now = new Date();

    switch (this.sortBy()) {
      case 'Priority+':
      case 'Priority-':
        return this.tasks().sort(
          (a, b) =>
            (prioIndex.indexOf(a.priority) - prioIndex.indexOf(b.priority)) *
            (this.sortBy() == 'Priority+' ? 1 : -1)
        );
      case 'DueDate+':
      case 'DueDate-':
        return this.tasks().sort(
          (a, b) =>
            (Math.abs(a.dueDate.getTime() - now.getTime()) -
              Math.abs(b.dueDate.getTime() - now.getTime())) *
            (this.sortBy() == 'DueDate+' ? 1 : -1)
        );
      case 'DateAdded+':
      case 'DateAdded-':
        return this.tasks().sort(
          (a, b) => a.dateAdded.getTime() - b.dateAdded.getTime()
        );
    }

    return this.tasks().sort(
      (a, b) => prioIndex.indexOf(a.priority) - prioIndex.indexOf(b.priority)
    );
  }

  handleCancelAddTask() {
    this.showTaskAdder.set(false);
  }

  handleAddTask(formValues: TaskFormType) {
    const newTask: TaskType = {
      id: uuidv4(),
      dateAdded: new Date(),
      dueDate: this.dateUtils.generateDateFromString(
        formValues.date!,
        formValues.time!
      ),
      title: formValues.title!,
      description: formValues.description!,
      priority: formValues.priority!,
    };

    this.tasks.update((_tasks) => [..._tasks, newTask]);
    this.showTaskAdder.set(false);
  }

  async handleDeleteTask(id: string) {
    const { isConfirmed } = await Swal.fire({
      title: 'Confirm deletion',
      text: 'Do you want to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#fb2c36',
    });

    if (!isConfirmed) {
      return;
    }

    const index = this.tasks().findIndex((task) => task.id == id);
    if (index == -1) {
      toast.error('Task not found.');
      return;
    }

    // Keep local copy of deleted task
    const deletedTask = this.tasks()[index];

    // Update tasks
    this.tasks.update((_tasks) => _tasks.filter((task) => task.id != id));

    toast('Task successfully deleted', {
      action: {
        label: 'Undo',
        onClick: () => {
          const tasksLocal = [...this.tasks()];
          // Put the deleted task back to its previous index
          tasksLocal.splice(index, 0, deletedTask);
          this.tasks.set(tasksLocal);
        },
      },
    });
  }

  handleEditTask(arg: { id: string; formValues: TaskFormType }) {
    const { id, formValues } = arg;
    let task: TaskType | undefined = this.tasks().find(
      (_task) => _task.id == id
    );

    if (!task) {
      toast.error('Task not found.');
      return;
    }

    task = {
      ...task,
      dueDate: this.dateUtils.generateDateFromString(
        formValues.date!,
        formValues.time!
      ),
      title: formValues.title!,
      description: formValues.description!,
      priority: formValues.priority!,
    };

    this.tasks.update((_tasks) =>
      _tasks.map((_task) => {
        if (_task.id != id) return _task;

        return task;
      })
    );
  }
}
