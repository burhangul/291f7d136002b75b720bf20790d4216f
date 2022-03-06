import {
  FETCH_HOTELS,
  FETCH_HOTEL_DETAILS,
  SET_SELECTED_HOTEL_DETAIL,
  SET_SELECTED_HOTEL,
  SET_SELECTED_CHILD_COUNT,
  SET_SELECTED_ADULT_COUNT,
  SET_CHECK_IN,
  SET_CHECK_OUT,
  SET_BOOKING,
  QUERY_COUPON_CODE,
  SET_FORM_STEP,
  RESET_FORM,
  SET_COUPON,
  SET_COUPON_CODE_ERROR,
  SET_LAST_RESERVATION_ID,
} from "./mutation-types";
export default {
  fetchHotels({ commit }) {
    commit(FETCH_HOTELS);
  },
  fetchHotelDetails({ commit }) {
    commit(FETCH_HOTEL_DETAILS);
  },
  setHotelDetail({ commit }, payload) {
    commit(SET_SELECTED_HOTEL_DETAIL, payload);
  },
  setHotel({ commit }, payload) {
    commit(SET_SELECTED_HOTEL, payload);
  },
  setChildCount({ commit }, payload) {
    commit(SET_SELECTED_CHILD_COUNT, payload);
  },
  setAdultCount({ commit }, payload) {
    commit(SET_SELECTED_ADULT_COUNT, payload);
  },
  setCheckIn({ commit }, payload) {
    commit(SET_CHECK_IN, payload);
  },
  setCheckOut({ commit }, payload) {
    commit(SET_CHECK_OUT, payload);
  },
  setBooking({ commit }, payload) {
    commit(SET_BOOKING, payload);
  },
  setCoupon({ commit }, payload) {
    commit(SET_COUPON, payload);
  },
  queryCouponCode({ commit }, payload) {
    commit(QUERY_COUPON_CODE, payload);
  },
  setFormStep({ commit }, payload) {
    commit(SET_FORM_STEP, payload);
  },
  resetForm({ commit }, payload) {
    commit(RESET_FORM, payload);
  },
  setCouponCodeError({ commit }, payload) {
    commit(SET_COUPON_CODE_ERROR, payload);
  },
  setLastReservationId({ commit }, payload) {
    commit(SET_LAST_RESERVATION_ID, payload);
  },
};
