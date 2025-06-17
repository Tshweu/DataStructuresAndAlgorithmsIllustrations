import { Component } from '@angular/core';

type Node<T> = {
  value: T;
  prev: Node<T> | null;
  next: Node<T> | null;
};

type Alert = {
  title: string;
  message: string;
  visible: boolean;
};

class DoublyLinkedList<T> implements Iterable<T> {
  private length: number = 0;
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  insertAtHead(value: T): void {
    const node: Node<T> = {
      value: value,
      next: null,
      prev: null,
    };

    this.length++;

    if (this.head === null) this.head = this.tail = node;
    else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  insertAtTail(value: T): void {
    const node: Node<T> = {
      value: value,
      next: null,
      prev: null,
    };

    this.length++;

    if (this.tail === null) this.head = this.tail = node;
    else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
  }

  insertAt(value: T, index: number): void {
    let node: Node<T> = {
      value: value,
      prev: null,
      next: null,
    };

    if (index === 0) {
      this.insertAtHead(value);
      return;
    }

    if (index >= this.length) return;

    if (this.head === null) return;

    if (index === this.length - 1) {
      this.insertAtTail(value);
      return;
    }

    let current = this.traverse(index);
    if (current === null) return;

    this.length++;

    node.next = current;
    node.prev = current!.prev;
    current!.prev!.next = node;
    current!.prev = node;
  }

  deleteAtHead(): T | null {
    if (this.head === null) return null;
    let current = this.head;
    this.length--;
    if (this.head === this.tail) {
      this.head = this.tail = null;
      return current.value;
    }
    this.head = this.head.next;
    this.head!.prev = null;
    current.next = null;
    return current.value;
  }

  deleteAtTail(): T | null {
    if (this.tail === null) return null;
    let current = this.tail;
    this.length--;
    if (this.head === this.tail) {
      this.head = this.tail = null;
      return current.value;
    }
    this.tail = current.prev;
    this.tail!.next = null;
    current.prev = null;
    return current.value;
  }

  delete(index: number): T | null {
    if (this.head === null) {
      return null;
    }

    if (index === 0) return this.deleteAtHead();

    if (index === this.length - 1) return this.deleteAtTail();

    let deleted = this.traverse(index);

    if (deleted === null) return null;

    this.length--;

    deleted!.prev!.next = deleted.next;
    deleted!.next!.prev = deleted.prev;
    deleted.next = deleted.prev = null;
    return deleted.value;
  }

  traverse(index: number): Node<T> | null {
    let i = 0;
    let current = this.head;
    if (this.head === null) return null;
    if (index >= this.size() || index < 0) return null;
    while (i < index && current !== null) {
      current = current.next;
      i += 1;
    }
    return current;
  }

  size(): number {
    return this.length;
  }

  peek(): T | null {
    return this.head ? this.head.value : null;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next(): IteratorResult<T> {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value: value, done: false };
        }
        return { value: undefined as any, done: true };
      },
    };
  }
}

@Component({
  selector: 'app-doubly-linked-list',
  imports: [],
  templateUrl: './doubly-linked-list.component.html',
  styleUrl: './doubly-linked-list.component.scss',
})
export class DoublyLinkedListComponent {
  doublyLinkedList = new DoublyLinkedList<number>();
  alert: Alert = {
    title: '',
    message: '',
    visible: false,
  };
  constructor() {
    for (let i = 0; i < 5; i++) {
      this.generate();
    }
  }

  showAlert(title: string, message: string = ''): void {
    this.alert = {
      title: title,
      message: message,
      visible: true,
    };
  }

  generate(): number {
    const value = this.getRandomNumber();
    this.doublyLinkedList.insertAtTail(value);
    return value;
  }

  getRandomIndex(): number {
    return Math.floor(Math.random() * this.doublyLinkedList.size());
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }

  length(): void {
    this.showAlert(
      'DoublyLinkedList length: ',
      this.doublyLinkedList.size() + ''
    );
  }

  addToHead(): void {
    this.doublyLinkedList.insertAtHead(this.getRandomNumber());
    this.showAlert('Added: ', this.doublyLinkedList.peek() + '');
  }

  addToTail(): void {
    const value = this.generate();
    this.showAlert('Added: ', value + ' to the dll');
  }

  addAtIndex(): void {
    const value = this.getRandomNumber();
    const index = this.getRandomIndex();
    this.doublyLinkedList.insertAt(value, index);
    this.showAlert('Added: ', value + ' at index ' + index);
  }

  removeAtHead(): void {
    const value = this.doublyLinkedList.deleteAtHead();
    this.showAlert('Deleted: ', value + ' at head');
  }

  removeAtTail(): void {
    const value = this.doublyLinkedList.deleteAtTail();
    this.showAlert('Deleted: ', value + ' at tail');
  }

  removeAtIndex(): void {
    const index = this.getRandomIndex();
    const value = this.doublyLinkedList.delete(index);
    this.showAlert('Deleted: ', value + ' at index ' + index);
  }

  isEmpty(): void {
    this.showAlert(
      'DoublyLinkedList is ',
      this.doublyLinkedList.size() === 0 ? 'empty' : 'not empty'
    );
  }

  peak(): void {
    this.showAlert(
      'The head of the queue is : ',
      this.doublyLinkedList.peek() + ''
    );
  }
}
