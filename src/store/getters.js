export default {
  getHotelById: (state) => (id) => {
    return state.hotelDetails.find((hotel) => hotel.hotel_id === id);
  },
  getNightsCount: (state) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(state.booking.end_date);
    const secondDate = new Date(state.booking.start_date);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  },
  getStartDate: (state) => {
    return new Date(state.booking.start_date).toLocaleString("tr", {
      dateStyle: "short",
    });
  },
  getEndDate: (state) => {
    return new Date(state.booking.end_date).toLocaleString("tr", {
      dateStyle: "short",
    });
  },
  getRoomType: (state) => {
    return (
      state.booking.selectedHotelDetail.room_type &&
      state.booking.selectedHotelDetail.room_type.find(
        (room) => room.id == state.booking.room_type
      )["title"]
    );
  },
  getRoomScenic: (state) => {
    return (
      state.booking.selectedHotelDetail.room_scenic &&
      state.booking.selectedHotelDetail.room_scenic.find(
        (room) => room.id == state.booking.room_scenic
      )["title"]
    );
  },
  getSelectChildStatus: (state) => {
    return state.booking.selectedHotelDetail.child_status === undefined
      ? true
      : state.booking.selectedHotelDetail.child_status;
  },
  getAdultCounts: (state) => {
    return state.booking.selectedHotelDetail &&
      state.booking.selectedHotelDetail.max_adult_size
      ? Array.from(
          Array(state.booking.selectedHotelDetail.max_adult_size + 1).keys()
        )
      : [0, 1, 2, 3, 4, 5];
  },
  getUniqPossibilities: (state) => {
    const possibilities = state.booking.selectedHotelDetail.possibilities;
    const lowerArray =
      possibilities && possibilities.map((posb) => posb.toLowerCase());
    return lowerArray && [...new Set(lowerArray)];
  },
  getRoomPrice: (state) => {
    const roomTypes = state.booking.selectedHotelDetail.room_type;
    return (
      roomTypes &&
      roomTypes.find((room) => room.id == state.booking.room_type)["price"]
    );
  },
  getRoomScenicRate: (state) => {
    const roomScenics = state.booking.selectedHotelDetail.room_scenic;
    return (
      roomScenics &&
      roomScenics.find((room) => room.id == state.booking.room_scenic)[
        "price_rate"
      ]
    );
  },
  getTotal: (state, getters) => {
    const price = getters.getRoomPrice * getters.getNightsCount;
    const rate = (price * getters.getRoomScenicRate) / 100;
    const coupon = state.booking.coupon.discount_ammount
      ? state.booking.coupon.discount_ammount
      : 0;
    return price + rate - coupon;
  },
};
