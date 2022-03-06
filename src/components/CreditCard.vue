<template>
  <div class="card-container">
    <div class="credit-card">
      <div class="front"></div>
      <div class="back"></div>
    </div>
    <div class="card-form">
      <h1>Kredi Kartı Bilgileri</h1>
      <div class="card-form-field">
        <label for="userName">Kart Üzerindeki İsim</label>
        <input
          type="text"
          name="userName"
          placeholder="Kartın Üzerindeki İsim"
          v-model="bookingStore.booking.cc.card_name"
          @keyup="nameSurnameError = false"
          @keypress="blockSpecialChars($event)"
          @paste.prevent
          autocomplete="off"
          maxlength="120"
        />
        <span class="error" v-if="nameSurnameError"
          >Lütfen kart üzerindeki ad soyadı giriniz</span
        >
      </div>
      <div class="card-form-field">
        <label for="userName">Kart Numarası</label>
        <input
          type="text"
          name="userName"
          placeholder="Kart Numarası"
          v-model="bookingStore.booking.cc.card_number"
          @keypress="isNumber($event)"
          @paste.prevent
          @keyup="cardNumberError = false"
          autocomplete="off"
          maxlength="16"
        />
        <span class="error" v-if="cardNumberError"
          >Lütfen kart numarasını giriniz</span
        >
      </div>
      <div class="card-security">
        <div class="card-form-field">
          <label for="expiration">Son Kullanma Tarihi</label>
          <div class="expiration-field">
            <select
              name="months"
              v-model="bookingStore.booking.cc.card_date_month"
              @change="handleExpirationDates"
            >
              <option value="" disabled>Ay</option>
              <option
                v-for="month in bookingStore.months"
                :key="month"
                :value="month"
              >
                {{ month }}
              </option>
            </select>
            <select
              name="years"
              v-model="bookingStore.booking.cc.card_date_year"
              @change="handleExpirationDates"
            >
              <option value="" disabled>Yıl</option>
              <option
                v-for="year in bookingStore.years"
                :key="year"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
          </div>
          <span class="error" v-if="expirationError"
            >Lütfen son kullanma tarihini giriniz</span
          >
        </div>
        <div class="card-form-field">
          <label for="cvv">CVV</label>
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            v-model="bookingStore.booking.cc.card_cvv"
            @keypress="isNumber($event)"
            @keyup="cvvError = false"
            autocomplete="off"
            maxlength="4"
          />
          <span class="error" v-if="cvvError"
            >Lütfen kartın arkasındaki CVV alanını giriniz</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "CreditCard",
  data() {
    return {
      cvvError: false,
      expirationError: false,
      cardNumberError: false,
      nameSurnameError: false,
    };
  },
  computed: {
    ...mapState({
      bookingStore: (state) => state.bookingStore,
    }),
    ...mapGetters({
      total: "bookingStore/getTotal",
    }),
  },
  mounted() {
    EventBus.$on("saveForm", this.saveFormHandler);
  },
  destroyed() {
    EventBus.$off("saveForm", this.saveFormHandler);
  },
  methods: {
    ...mapActions({
      setLastReservationId: "bookingStore/setLastReservationId",
    }),
    isNumber(evt) {
      evt = evt ? evt : window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    blockSpecialChars(evt) {
      evt = evt ? evt : window.event;
      const key = String.fromCharCode(evt.which ? evt.which : evt.keyCode);
      const regex = new RegExp("^[a-zA-Z ]+$");
      if (!regex.test(key)) {
        evt.preventDefault();
        return false;
      }
    },
    saveFormHandler() {
      if (
        !this.bookingStore.booking.cc.card_name ||
        !this.bookingStore.booking.cc.card_name.replace(/\s/g, "").length
      ) {
        this.nameSurnameError = true;
      }
      if (!this.bookingStore.booking.cc.card_number.length) {
        this.cardNumberError = true;
      }
      if (
        !this.bookingStore.booking.cc.card_date_month.length &&
        !this.bookingStore.booking.cc.card_date_year
      ) {
        this.expirationError = true;
      }
      if (!this.bookingStore.booking.cc.card_cvv.length) {
        this.cvvError = true;
      }
      if (
        !this.cvvError &&
        !this.expirationError &&
        !this.cardNumberError &&
        !this.nameSurnameError
      ) {
        const lastRes = this.bookingStore.booking.lastReservationId;
        const _url =
          "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/" +
          (lastRes.length ? lastRes : "");
        const requestType = lastRes.length ? "put" : "post";
        this.$axios[requestType](_url, this.getBookingPostObj()).then(
          (response) => {
            this.setLastReservationId(response.data.id);
            localStorage.setItem(
              "lastReservation",
              JSON.stringify(this.bookingStore.booking)
            );
            localStorage.removeItem("lastBooking");
            this.$router.push({ name: "reservation" }).catch(() => {});
          }
        );
      }
    },
    handleExpirationDates() {
      if (
        this.bookingStore.booking.cc.card_date_month.length &&
        this.bookingStore.booking.cc.card_date_year
      ) {
        this.expirationError = false;
      }
    },
    getBookingPostObj() {
      const $storeObj = this.bookingStore.booking;
      let postObj = {
        ...$storeObj.cc,
      };
      postObj["hotel_id"] = parseInt($storeObj.hotel_id);
      postObj["start_date"] = $storeObj.start_date;
      postObj["end_date"] = $storeObj.end_date;
      postObj["adult"] = parseInt($storeObj.adult);
      postObj["child"] = parseInt($storeObj.child);
      postObj["room_type"] = $storeObj.room_type;
      postObj["room_scenic"] = $storeObj.room_scenic;
      postObj["price"] = this.total;
      if ($storeObj.coupon.code && $storeObj.coupon.code.length) {
        postObj["coupon_code"] = $storeObj.coupon.code;
      }
      return postObj;
    },
  },
};
</script>

<style lang="less" scoped>
.card-container {
  display: flex;
  flex: 65%;
  border: 1px solid #e9e9e9;
  border-radius: 8px;
  padding: 20px;
  .card-form {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    position: relative;
    width: 100%;
    border: 1px solid black;
    padding: 20px;
    row-gap: 20px;
    .error {
      display: flex;
      align-self: baseline;
      font-size: 13px;
      color: #dc3545;
    }
    .card-form-field {
      display: flex;
      flex-direction: column;
      align-items: baseline;
      width: 100%;
      input {
        width: 100%;
        max-height: 38px;
      }
      select {
        width: 100%;
        min-width: 60px;
      }
      .expiration-field {
        display: flex;
        width: 100%;
        column-gap: 10px;
      }
    }
    h1 {
      position: absolute;
      top: -12px;
      background-color: #fff;
    }
    .card-security {
      display: flex;
      width: 100%;
      justify-content: space-between;
      column-gap: 40px;
    }
  }
}
@media screen and (max-width: 768px) {
  .card-form-field label {
    font-size: 12px;
  }
}
</style>