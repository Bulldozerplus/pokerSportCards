import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFieldPageComponent } from './game-field-page.component';

describe('GameFieldPageComponent', () => {
  let component: GameFieldPageComponent;
  let fixture: ComponentFixture<GameFieldPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameFieldPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameFieldPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
