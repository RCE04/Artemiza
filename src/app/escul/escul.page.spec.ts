import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsculPage } from './escul.page';

describe('EsculPage', () => {
  let component: EsculPage;
  let fixture: ComponentFixture<EsculPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EsculPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
