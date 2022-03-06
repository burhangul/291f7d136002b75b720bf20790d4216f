import {
  FETCH_HOTELS,
  FETCH_HOTEL_DETAILS,
  SET_SELECTED_HOTEL_DETAIL,
  SET_SELECTED_HOTEL,
  SET_SELECTED_CHILD_COUNT,
  SET_SELECTED_ADULT_COUNT,
  SET_BOOKING,
  QUERY_COUPON_CODE,
  SET_FORM_STEP,
  RESET_FORM,
  SET_COUPON_CODE_ERROR,
  SET_COUPON,
  SET_LAST_RESERVATION_ID,
} from "./mutation-types";
import axios from "axios";
export default {
  [FETCH_HOTELS](state) {
    if (state.hotels.length) return;
    axios
      .get("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels")
      .then((response) => {
        state.hotels = response.data;
      });
  },
  [FETCH_HOTEL_DETAILS](state) {
    if (state.hotelDetails.length) return;
    axios
      .get("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details")
      .then((response) => {
        state.hotelDetails = response.data;
      });
  },
  [SET_SELECTED_HOTEL_DETAIL](state, payload) {
    state.booking.selectedHotelDetail = state.hotelDetails.find(
      (hotel) => hotel.hotel_id === payload
    );
  },
  [SET_SELECTED_HOTEL](state, payload) {
    state.booking.selectedHotel = payload;
  },
  [SET_SELECTED_CHILD_COUNT](state, payload) {
    state.selectedChild = payload;
  },
  [SET_SELECTED_ADULT_COUNT](state, payload) {
    state.selectedAdult = payload;
  },
  [SET_BOOKING](state, payload) {
    state.booking = { ...state.booking, ...payload };
  },
  [QUERY_COUPON_CODE](state, payload) {
    axios
      .get(
        `${
          "https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons?code=" +
          payload
        }`
      )
      .then((response) => {
        if (response.data.length) {
          const usableCoupon = response.data.find((coupon) => {
            const couponDate = new Date(coupon.expiration_at).getTime();
            const today = new Date().getTime();
            if (couponDate && couponDate > today) {
              return coupon;
            }
          });
          state.booking.coupon = usableCoupon;
          if (!usableCoupon) {
            state.booking.couponCodeError =
              "Bu koda sahip uygun kupon bulunamadı";
          } else {
            state.booking.couponCodeError = "";
          }
        } else {
          state.booking.coupon = {};
          state.booking.couponCodeError =
            "Bu koda sahip uygun kupon bulunamadı";
        }
      });
  },
  [SET_FORM_STEP](state, payload) {
    state.form_step = payload;
  },
  [RESET_FORM](state) {
    state.booking = {
      lastReservationId: "",
      selectedHotel: "",
      selectedHotelDetail: {},
      hotel_id: 0,
      start_date: "",
      end_date: "",
      adult: 0,
      child: 0,
      room_type: 0,
      room_scenic: 0,
      price: 0,
      coupon: {},
      couponCodeError: "",
      cc: {
        card_name: "",
        card_number: "",
        card_date_month: "",
        card_date_year: "",
        card_cvv: "",
      },
    };
    localStorage.removeItem("lastBooking");
    localStorage.removeItem("lastReservation");
  },
  [SET_COUPON](state, payload) {
    state.booking.coupon = payload;
  },
  [SET_COUPON_CODE_ERROR](state, payload) {
    state.booking.couponCodeError = payload;
  },
  [SET_LAST_RESERVATION_ID](state, payload) {
    state.booking.lastReservationId = payload;
  },
};
