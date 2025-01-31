import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { GeneralLayoutComponent } from './app/general-layout.component';

bootstrapApplication(GeneralLayoutComponent, appConfig)
  .catch((err) => console.error(err));
