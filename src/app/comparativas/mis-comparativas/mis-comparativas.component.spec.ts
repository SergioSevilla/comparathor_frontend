import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisComparativasComponent } from './mis-comparativas.component';

describe('MisComparativasComponent', () => {
  let component: MisComparativasComponent;
  let fixture: ComponentFixture<MisComparativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisComparativasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisComparativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
