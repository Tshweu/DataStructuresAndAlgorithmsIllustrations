import { Component } from '@angular/core';

type Node<T> = {
  value: T;
  prev: Node<T> | null;
}

type Alert = {
  title: string;
  message: string;
  visible: boolean;
}

class Queue<T> implements Iterable<T> {
  private length: number = 0;
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  enqueue(value: T): void{
    let node: Node<T> = {
      value: value,
      prev: null
    };
    this.length++;
    if(this.head === null){
      this.head = this.tail = node;
    }else{
      this.tail!.prev = node
      this.tail = node
    }
  }

  dequeue(): T | null {
    if(this.head === null){
      return null;
    }
    let current : Node<T> = this.head;
    if(this.length === 1){
      this.head = this.tail = null;
    }
    this.length--;
    this.head = current.prev
    return current.value;
  }

  size(): number {
    return this.length;
  }

  peek(): T | null {
    return this.head ? this.head.value : null
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next(): IteratorResult<T> {
        if(current){
          const value = current.value;
          current = current.prev;
          return { value:value,done: false}
        }
        return { value: undefined as any , done: true}
      }
    }
  }
}

@Component({
  selector: 'app-queues',
  imports: [],
  templateUrl: './queues.component.html',
  styleUrl: './queues.component.scss'
})
export class QueuesComponent {
  queue = new Queue<number>();
  alert: Alert = {
    title: '',
    message: '',
    visible: false
  }
  constructor(){
    for(let i = 0;i < 5;i++){
      this.generate();
    }
  }

  showAlert(title: string, message: string = ''):void{
    this.alert = {
      title : title,
      message : message,
      visible : true
    }
  }

  generate():void{
    const val = Math.floor(Math.random()*100)
    this.queue.enqueue(val);
    this.showAlert('Added: ',val+'');
  }

  length():void{
    this.showAlert('Queue length: ',this.queue.size()+'')
  }

  enqueue(): void{
    this.generate();
  }

  dequeue(): void{
    if(this.queue.size() === 0){
      this.showAlert('No items in queue','');
    }else{
      const value = this.queue.dequeue();
      this.showAlert('Removed: ',value+' from the queue');
    }
  }

  isEmpty(): void{
    this.showAlert('Queue is ',this.queue.size() === 0 ? 'empty' : 'not empty');
  }

  peak(): void{
    this.showAlert('The head of the queue is : ',this.queue.peek()+'');
  }
}
