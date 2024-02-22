import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrecioComponent } from './card-precio.component';

describe('CardPrecioComponent', () => {
  let component: CardPrecioComponent;
  let fixture: ComponentFixture<CardPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPrecioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
