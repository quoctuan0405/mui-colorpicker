import { Action } from "@reduxjs/toolkit";
import { filter, debounceTime, switchMap } from "rxjs";
import { Epic } from "redux-observable";
import { RootState } from "../store";
import { setThemeColors, setThemeColorsSuccessfully } from "../reducer/theme";

export const setThemeColorsEpic: Epic<Action, Action, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(setThemeColors.match),
    debounceTime(40),
    switchMap(async (action) => setThemeColorsSuccessfully(action.payload))
  );
