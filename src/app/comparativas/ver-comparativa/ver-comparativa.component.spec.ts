import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComparativaComponent } from './ver-comparativa.component';

describe('VerComparativaComponent', () => {
  let component: VerComparativaComponent;
  let fixture: ComponentFixture<VerComparativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerComparativaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerComparativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
