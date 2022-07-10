import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import { UnresolvedResponse } from "../api/models/cocktail";

@Injectable()
export class FlatResponseInterceptor implements HttpInterceptor {
  public intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<UnresolvedResponse>> {
    return next.handle(httpRequest).pipe(
      map((event: HttpEvent<UnresolvedResponse>) => {
        if (event instanceof HttpResponse<UnresolvedResponse>) {
          // @ts-ignore
          event = event.clone({ body: event.body?.drinks })
        }
        return event;
      })
    );
  }
}
