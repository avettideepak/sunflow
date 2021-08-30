/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { SHOW_CONFIRM, HIDE_CONFIRM } from "../types";

export const showConfirmation = payload => ({
  type: SHOW_CONFIRM,
  payload: payload
});

export const hideConfirmation = () => ({
  type: HIDE_CONFIRM
});
