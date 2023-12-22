import { toggleShowAlert } from 'models/actions/alertActions';
import { setGeneralLoading } from 'models/actions/catalogActions';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const catchErrorOperator = (flag) =>
  catchError((error) => {
    if (flag) {
      return of(
        toggleShowAlert({
          message: `${error}`,
          type: 'error',
          show: true,
        }),
        setGeneralLoading(false),
      );
    }

    return of(
      toggleShowAlert({
        message: `${error}`,
        type: 'error',
        show: true,
      }),
    );
  });

export default catchErrorOperator;
