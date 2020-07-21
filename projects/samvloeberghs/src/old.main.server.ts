import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { OldAppServerModule } from './app/old.app.server.module';
export { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
export { ngExpressEngine, RenderOptions } from '@nguniversal/express-engine';
export { renderModuleFactory, renderModule } from '@angular/platform-server';
