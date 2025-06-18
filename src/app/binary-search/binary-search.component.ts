import { Component } from '@angular/core';

type Alert = {
  title: string;
  message: string;
  visible: boolean;
};

type Item = {
  value: number;
  selected: boolean;
  disabled: boolean;
};

@Component({
  selector: 'app-binary-search',
  imports: [],
  templateUrl: './binary-search.component.html',
  styleUrl: './binary-search.component.scss',
})
export class BinarySearchComponent {
  arr: Item[] = [];
  searchValue!: number;
  length: number = 10;
  alert: Alert = {
    title: '',
    message: '',
    visible: false,
  };
  constructor() {
    this.init();
  }

  init(){
    this.searchValue = Math.floor(Math.random() * 15);
    this.arr = [];
    for (let i = 0; i < this.length; i++) {
      this.arr.push({
        value: Math.floor(Math.random() * 15),
        selected: false,
        disabled: false,
      });
    }
    this.arr.sort((a, b) => a.value - b.value);
    this.alert.visible = false;
  }
  async interativeSearch(): Promise<number> {
    let left: number = 0;
    let right: number = this.arr.length - 1;
    while (left <= right) {
      let middle: number = Math.floor((left + right + 1) / 2);
      this.arr[middle].selected = true;
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      if (this.searchValue === this.arr[middle].value) {
        this.showAlert(
          'Found ' + this.searchValue,
          ' Found value at index ' + middle
        );
        return middle;
      }
      if (this.searchValue > this.arr[middle].value) {
        left = middle + 1;
      }
      if (this.searchValue < this.arr[middle].value) {
        right = middle - 1;
      }
      this.arr[middle].selected = false;
    }
    this.showAlert(this.searchValue + ' Not Found ', 'Value is not in array');
    return -1;
  }

  async recursiveSearch(left: number, right: number): Promise<number> {
    let middle = Math.floor((left + right + 1) / 2);
    if (left <= right) {
      this.arr[middle].selected = true;
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      if (this.searchValue === this.arr[middle].value) {
        this.showAlert(
          'Found ' + this.searchValue,
          ' Found value at index ' + middle
        );
        return middle;
      }
      if (this.searchValue < this.arr[middle].value) right = middle - 1;
      if (this.searchValue > this.arr[middle].value) left = middle + 1;
      return this.recursiveSearch(left, right);
    }
    this.showAlert(this.searchValue + ' Not Found ', 'Value is not in array');
    return -1;
  }

  showAlert(title: string, message: string = ''): void {
    this.alert = {
      title: title,
      message: message,
      visible: true,
    };
  }
}
