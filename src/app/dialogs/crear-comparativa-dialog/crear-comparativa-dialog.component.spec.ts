import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComparativaDialogComponent } from './crear-comparativa-dialog.component';

describe('CrearComparativaDialogComponent', () => {
  let component: CrearComparativaDialogComponent;
  let fixture: ComponentFixture<CrearComparativaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearComparativaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearComparativaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
