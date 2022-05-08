/* Http Interceptor를 한 번에 관리합니다. */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './noop-interceptor';

export const httpInterceptorProviders =[
    {provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi:true}
]