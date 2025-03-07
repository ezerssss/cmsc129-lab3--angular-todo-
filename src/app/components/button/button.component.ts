import { Component, computed, input, output } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  text = input('');
  type = input('button');
  btnDisabled = input(false);
  btnClass = input('');
  mergedClass = computed(() =>
    twMerge(
      'rounded-lg py-2 px-4 cursor-pointer bg-black text-white text-sm disabled:cursor-default disabled:opacity-50',
      this.btnClass()
    )
  );

  handleClick = output<void>();

  onClick() {
    this.handleClick.emit();
  }
}
