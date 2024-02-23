import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComparativaComponent } from './crear-comparativa.component';

describe('CrearComparativaComponent', () => {
  let component: CrearComparativaComponent;
  let fixture: ComponentFixture<CrearComparativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearComparativaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearComparativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
