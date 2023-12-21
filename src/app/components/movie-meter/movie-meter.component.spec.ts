import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieMeterComponent } from './movie-meter.component';

describe('MovieMeterComponent', () => {
  let component: MovieMeterComponent;
  let fixture: ComponentFixture<MovieMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieMeterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
