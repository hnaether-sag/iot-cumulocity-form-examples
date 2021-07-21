import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule as ngRouterModule, Routes } from "@angular/router";
import {
  CoreModule,
  BootstrapComponent,
  RouterModule,
  HOOK_NAVIGATOR_NODES,
  NavigatorNode,
} from "@c8y/ngx-components";
import { Example1Component } from "./example1/example1.component";

const routes: Routes = [
  {
    path: "example1",
    component: Example1Component,
  },
];

const navigation = new NavigatorNode({
  label: 'Form Examples',
  icon: 'road',
  priority: 1
});

navigation.add(
  new NavigatorNode({
    label: 'Example 1',
    path: '/example1',
    icon: 'table',
    priority: 1
  })
);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(),
    ngRouterModule.forRoot(routes, { enableTracing: false, useHash: true }),
    CoreModule.forRoot(),
    ReactiveFormsModule,
  ],
  declarations: [Example1Component],
  providers: [{ provide: HOOK_NAVIGATOR_NODES, useValue: { get: () => navigation }, multi: true }],
  entryComponents: [Example1Component],
  bootstrap: [BootstrapComponent],

})
export class AppModule {}
