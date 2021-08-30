/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { take, put, race } from "redux-saga/effects";
import { showConfirmation, hideConfirmation } from "../actions/confirmActions";
import { confirmActions } from "../types";

export function* confirmSaga(confirmationMessage) {
  // Cause the dialog to be shown (reducer will put the message
  // in the store; the main shell UI component will receive the
  // message in its props and then display the dialog)
  yield put(showConfirmation(confirmationMessage));
  // Wait for either a yes or a no.
  // The dialog UI component receives yes and no event handlers
  // in its props that dispatch these actions.
  const { yes } = yield race({
    yes: take(confirmActions.CONFIRM_YES),
    no: take(confirmActions.CONFIRM_NO)
  });
  // Tell a reducer to hide the dialog
  yield put(hideConfirmation());
  // Returns true if the 'yes' action was received
  return !!yes;
}
