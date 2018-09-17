import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router, routerStub

  beforeEach(async(inject([Router], (_router: Router) => {
    router = _router;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routerStub = {
      navigate: jasmine.createSpy('navigate'),
      providers: [{ provide: Router, useValue: routerStub }],
    };
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();


    // beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    //   location = _location;
    //   router = _router;
    // }));
  })));

  it('should create Home Component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in an h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Flix Terminal');
  }));

  it('should navigate to bus', async(() => {
    // component.router.navigateByUrl('/buses');
    // fixture.detectChanges();
    console.log(routerStub);
    // expect(routerStub.navigate)
    // .toHaveBeenCalledWith(['/buses']);
  }));

});
