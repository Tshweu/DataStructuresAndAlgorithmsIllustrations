import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoublyLinkedListComponent } from './doubly-linked-list.component';

describe('DoublyLinkedListComponent', () => {
  let component: DoublyLinkedListComponent;
  let fixture: ComponentFixture<DoublyLinkedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoublyLinkedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoublyLinkedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
