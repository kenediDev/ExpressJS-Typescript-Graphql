import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { prod } from '../../__prod__';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthComponent } from './auth/auth.component';
import { RouterModule } from '@angular/router';
import { routes } from '../routers/router.component';
import { FormsModule } from '@angular/forms';
import { DefaultComponent } from './default/default.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, DefaultComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: prod ? 'http://domain' : 'http://localhost:8000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
