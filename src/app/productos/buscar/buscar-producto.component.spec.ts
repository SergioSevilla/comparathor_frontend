import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarProductoComponent } from './buscar-productocomponent';

describe('BuscarProdcutoComponent', () => {
  let component: BuscarProductoComponent;
  let fixture: ComponentFixture<BuscarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
