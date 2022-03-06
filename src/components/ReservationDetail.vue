<template>
  <div class="booking-info-container">
    <h1>
      {{ booking.selectedHotel }}
      <span class="city">({{ booking.selectedHotelDetail.city }}) </span>
    </h1>
    <div class="booking">
      <div class="info-field"><span>Giriş Tarihi: </span> {{ startDate }}</div>
      <div class="info-field"><span>Çıkış Tarihi: </span> {{ endDate }}</div>
      <div class="info-field"><span>Yetişkin: </span> {{ booking.adult }}</div>
      <div class="info-field"><span>Çocuk: </span> {{ booking.child }}</div>
      <div class="info-field"><span>Oda Tipi: </span> {{ roomType }}</div>
      <div class="info-field"><span>Manzara: </span> {{ roomScenic }}</div>
    </div>
    <div class="coupon-form" v-if="showCouponForm">
      <div class="input-form">
        <input
          type="text"
          placeholder="Kupon Kodu"
          v-model="couponCode"
          @keyup.enter="handleCouponCode"
          @keyup="setCouponCodeError('')"
        />
        <button @click="handleCouponCode">Kodu kullan</button>
      </div>
      <span v-if="booking.couponCodeError" class="error">{{
        booking.couponCodeError
      }}</span>
    </div>
    <CostDetail />
  </div>
</template>

<script>
import CostDetail from "@/components/CostDetail.vue";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "ReservationDetail",
  components: {
    CostDetail,
  },
  props: {
    showCouponForm: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      couponCode: "",
    };
  },
  computed: {
    ...mapState({
      booking: (state) => state.bookingStore.booking,
    }),
    ...mapGetters({
      nightsCount: "bookingStore/getNightsCount",
      startDate: "bookingStore/getStartDate",
      endDate: "bookingStore/getEndDate",
      roomType: "bookingStore/getRoomType",
      roomScenic: "bookingStore/getRoomScenic",
    }),
  },
  methods: {
    ...mapActions({
      queryCouponCode: "bookingStore/queryCouponCode",
      setCouponCodeError: "bookingStore/setCouponCodeError",
      setCoupon: "bookingStore/setCoupon",
    }),
    handleCouponCode() {
      if (this.couponCode.length) {
        this.queryCouponCode(this.couponCode.toLowerCase());
      } else {
        this.setCoupon({});
      }
    },
  },
};
</script>

<style lang="less" scoped>
.booking-info-container {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #e9e9e9;
  border-radius: 4px;
  row-gap: 16px;
  flex: 35%;
  h1 {
    align-self: baseline;
    .city {
      font-weight: 500;
    }
  }
  .booking {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .info-field {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1 0 48%;
      background-color: #fff;
      padding: 8px;
      border-radius: 8px;
      span {
        font-weight: bold;
      }
    }
  }
  .coupon-form {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    align-items: center;
    background-color: #fff;
    padding: 8px;
    border-radius: 8px;
    .input-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        height: 100%;
        max-width: 140px;
        margin-right: 5px;
      }
    }
    .error {
      display: flex;
      align-self: baseline;
      font-size: 13px;
      color: #dc3545;
    }
  }
}
</style>