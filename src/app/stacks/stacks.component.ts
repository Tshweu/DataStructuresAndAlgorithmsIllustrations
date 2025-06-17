import { Component } from '@angular/core';

type Node<T> = {
  value: T;
  next: Node<T> | null;
}

type Alert = {
  title: string;
  message: string;
  visible: boolean;
}

class Stack<T> implements Iterable<T> {
  private top: Node<T> | null = null;

  push(value: T): void {
    const newNode: Node<T> = { value, next: this.top };
    this.top = newNode;
  }

  pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const poppedValue = this.top!.value;
    this.top = this.top!.next;
    return poppedValue;
  }

  peek(): T | null {
    return this.isEmpty() ? null : this.top!.value;
  }

  isEmpty(): boolean {
    return this.top === null;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.top;
    return {
      next(): IteratorResult<T> {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value, done: false };
        }
        return { value: undefined as any, done: true };
      }
    };
  }
}

@Component({
  selector: 'app-stacks',
  imports: [],
  templateUrl: './stacks.component.html',
  styleUrl: './stacks.component.scss',
  // animations: [
  //   trigger('stackItemAnim', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateY(20px) scale(0.8)' }),
  //       animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
  //     ]),
  //     transition(':leave', [
  //       animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px) scale(0.8)' }))
  //     ])
  //   ])
  // ]
})
export class StacksComponent {
  title = 'Stacks Animation';
  description = 'This page demonstrates the animation of stacks data structure.';
  stack: Stack<number> = new Stack();
  alert: Alert = {
    title: '',
    message: '',
    visible: false
  }
  constructor() {
    // Initialize the stack with some values
    for (let i = 0; i < 5; i++) {
      this.addRandomValue();
    }
  }

  showAlert(title: string, message: string = ''): void {
    this.alert = {
      title: title,
      message: message,
      visible: true
    }
  }

  addRandomValue(): void {
    this.stack.push(Math.floor(Math.random() * 100));
  }

  pop(): void {
    const poppedValue = this.stack.pop();
    if (poppedValue !== null) {
      this.showAlert('Removed : ', poppedValue + '');
    } else {
      this.showAlert('Stack is empty, nothing to pop.');
    }
  }

  push(): void {
    const value = Math.floor(Math.random() * 100); // Generate a random number
    this.stack.push(value);
    this.showAlert(`Pushed value: ${value}`);
  }

  peak(): void {
    const top = this.stack.peek();
    if (top !== null) {
      this.showAlert(`Top value: ${top}`);
    } else {
      this.showAlert('Stack is empty, nothing to peek.');
    }
  }

  isEmpty(): boolean {
    if (this.stack.isEmpty()) {
      this.showAlert('Stack is empty.');
      return true;
    }
    else {
      this.showAlert('Stack is not empty.');
      return false;
    }
  }
}
