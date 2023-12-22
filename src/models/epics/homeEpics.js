import makeRequest from 'library/makeRequest';
import { toggleShowAlert } from 'models/actions/alertActions';
import { setGeneralLoading } from 'models/actions/catalogActions';
import {
  getHomePageData,
  setHomePageData,
  getLogo,
  setLogo,
} from 'models/actions/homeActions';
import { ofType, combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, concatMap } from 'rxjs/operators';

import catchErrorOperator from './operators/catchErrorOperator';

const getLogoEpic = (action$) =>
  action$.pipe(
    ofType(getLogo.type),
    mergeMap(() =>
      from(makeRequest('logo', 'GET', '')).pipe(
        concatMap((payload) => [setLogo(payload?.logo)]),
      ),
    ),
  );

const getHomePageDataEpic = (action$) =>
  action$.pipe(
    ofType(getHomePageData.type),
    mergeMap(() =>
      from(makeRequest('home', 'GET', '')).pipe(
        concatMap((payload) => {
          const newPayload = {
            ...payload,
            tabsOffers: payload?.tabsOffers?.map((offer, index) => ({
              ...offer,
              index,
            })),
          };

          return [
            setHomePageData(newPayload),
            toggleShowAlert({ message: '', show: false, type: 'error' }),
            setGeneralLoading(false),
          ];
        }),
        catchErrorOperator(true),
      ),
    ),
  );

export { getHomePageDataEpic, getLogoEpic };

const epics = combineEpics(getHomePageDataEpic, getLogoEpic);

export default epics;
