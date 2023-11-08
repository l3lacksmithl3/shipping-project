import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQRComponent } from './create-qr.component';

describe('CreateQRComponent', () => {
  let component: CreateQRComponent;
  let fixture: ComponentFixture<CreateQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
