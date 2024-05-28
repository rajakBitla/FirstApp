import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapGeneratorPage } from './map-generator.page';

describe('MapGeneratorPage', () => {
  let component: MapGeneratorPage;
  let fixture: ComponentFixture<MapGeneratorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapGeneratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
