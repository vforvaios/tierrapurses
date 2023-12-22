import makeRequest from 'library/makeRequest';
import { toggleShowAlert } from 'models/actions/alertActions';
import {
  getCategoriesMenu,
  setCategoriesMenu,
} from 'models/actions/categoriesActions';
import { setStaticPagesInMenu } from 'models/actions/staticActions';
import { ofType, combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, concatMap } from 'rxjs/operators';

import catchErrorOperator from './operators/catchErrorOperator';

const getCategoriesMenuEpic = (action$) =>
  action$.pipe(
    ofType(getCategoriesMenu.type),
    mergeMap(() =>
      from(makeRequest('menu', 'GET', '')).pipe(
        concatMap((payload) => {
          const { menu, staticPagesInMenu } = payload;

          return [
            setCategoriesMenu(menu),
            setStaticPagesInMenu(staticPagesInMenu),
            toggleShowAlert({ message: '', show: false, type: 'error' }),
          ];
        }),
        catchErrorOperator(false),
      ),
    ),
  );

export { getCategoriesMenuEpic };

const epics = combineEpics(getCategoriesMenuEpic);

export default epics;
