import qs from "query-string";
import { fromFetch } from "rxjs/fetch";
import * as TYPE from "./types";
import { showSpinner, hideSpinner } from "../ui";
import { onErrorApi } from "../error";
import { retryStrategy, headersJson } from "./helpers";
import {
  retryWhen,
  mergeMap,
  startWith,
  takeUntil,
  catchError,
} from "rxjs/operators";
import { ofType } from "redux-observable";

export const getAjaxRequestEpic = (action$) =>
  action$.pipe(
    ofType(TYPE.GET_AJAX_REQUEST_EPIC),
    mergeMap((action) => {
      const { url, onSuccess, onCancel, body } = action.payload;
      const inlineQuery = body === null ? "" : `?${qs.stringify(body)}`;

      return fromFetch(`${url}${inlineQuery}`, {
        headers: { ...headersJson },
      }).pipe(
        retryWhen(retryStrategy),
        mergeMap((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return [onErrorApi(response.status), hideSpinner()];
          }
        }),
        mergeMap((data) => {
          return [onSuccess(data)];
        }),
        catchError((err) => [onErrorApi(err), hideSpinner()]),
        takeUntil(action$.ofType(onCancel))
      );
    })
  );

export const patchAjaxRequestEpic = (action$) =>
  action$.ofType(TYPE.PATCH_AJAX_REQUEST_EPIC).pipe(
    mergeMap((action) => {
      const { url, onSuccess, onCancel, body } = action.payload;
      return fromFetch(url, {
        body,
        headers: { ...headersJson },
        method: "PATCH",
      }).pipe(
        retryWhen(retryStrategy),
        mergeMap((result) => [onSuccess(result.response)]),
        catchError((err) => [onErrorApi(err), hideSpinner()]),
        startWith(showSpinner()),
        takeUntil(action$.ofType(onCancel))
      );
    })
  );

export const postAjaxRequestEpic = (action$) =>
  action$.ofType(TYPE.POST_AJAX_REQUEST_EPIC).pipe(
    mergeMap((action) => {
      const { url, onSuccess, onCancel, body } = action.payload;
      return fromFetch(url, {
        body,
        headers: { ...headersJson },
        method: "POST",
      }).pipe(
        retryWhen(retryStrategy),
        mergeMap((result) => [onSuccess(result.response)]),
        catchError((err) => [onErrorApi(err), hideSpinner()]),
        startWith(showSpinner()),
        takeUntil(action$.ofType(onCancel))
      );
    })
  );

export const putAjaxRequestEpic = (action$) =>
  action$.pipe(
    ofType(TYPE.PUT_AJAX_REQUEST_EPIC),
    mergeMap((action) => {
      const { url, onSuccess, onCancel, body } = action.payload;
      return fromFetch(url, {
        body,
        headers: { ...headersJson },
        method: "POST",
      }).pipe(
        retryWhen(retryStrategy),
        mergeMap((result) => [onSuccess(result.response)]),
        catchError((err) => [onErrorApi(err), hideSpinner()]),
        startWith(showSpinner()),
        takeUntil(action$.ofType(onCancel))
      );
    })
  );

export const deleteAjaxRequestEpic = (action$) =>
  action$.pipe(
    ofType(TYPE.PUT_AJAX_REQUEST_EPIC),
    mergeMap((action) => {
      const { url, onSuccess, onCancel, body } = action.payload;

      return fromFetch(`${url}?${qs.stringify(body)}`, {
        headers: { ...headersJson },
        method: "DELETE",
      }).pipe(
        retryWhen(retryStrategy),
        mergeMap((result) => [onSuccess(result.response)]),
        catchError((err) => [onErrorApi(err), hideSpinner()]),
        startWith(showSpinner()),
        takeUntil(action$.ofType(onCancel))
      );
    })
  );

const epics = [
  getAjaxRequestEpic,
  patchAjaxRequestEpic,
  postAjaxRequestEpic,
  putAjaxRequestEpic,
  deleteAjaxRequestEpic,
];

export default epics;
