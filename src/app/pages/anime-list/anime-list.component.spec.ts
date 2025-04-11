import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeListComponent } from './anime-list.component';

describe('AnimeListComponent', () => {
  let component: AnimeListComponent;
  let fixture: ComponentFixture<AnimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
