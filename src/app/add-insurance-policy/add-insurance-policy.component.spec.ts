import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsurancePolicyComponent } from './add-insurance-policy.component';

describe('AddInsurancePolicyComponent', () => {
  let component: AddInsurancePolicyComponent;
  let fixture: ComponentFixture<AddInsurancePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInsurancePolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInsurancePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
