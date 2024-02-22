import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductoDialogComponent } from './ver-producto-dialog.component';

describe('VerProductoDialogComponent', () => {
  let component: VerProductoDialogComponent;
  let fixture: ComponentFixture<VerProductoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerProductoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerProductoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
