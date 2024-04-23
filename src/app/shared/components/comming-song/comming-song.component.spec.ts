import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommingSongComponent } from './comming-song.component';

describe('CommingSongComponent', () => {
  let component: CommingSongComponent;
  let fixture: ComponentFixture<CommingSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommingSongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommingSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
