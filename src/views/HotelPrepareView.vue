<template>
  <div class="main-container">
    <div class="selector-field">
      <select @change="handleHotel" v-model="booking.hotel_id">
        <option value="0" disabled hidden>
          Rezervasyon yapmak istediğiniz hoteli seçiniz.
        </option>
        <option v-for="hotel in hotels" :key="hotel.id" :value="hotel.id">
          {{ hotel.hotel_name }}
        </option>
      </select>
      <span class="error" v-if="hotelError">Lütfen otel seçimi yapınız</span>
    </div>
    <div class="selector-container">
      <div class="date-picker">
        <HotelDatePicker
          ref="hoteldatesform"
          format="DD.MM.YYYY"
          :i18n="datePickerLangSetting"
          :hoveringTooltip="false"
          @period-selected="handlePeriods"
          @check-in-changed="handleClearPeriods"
          @clear-selection="handleClearPeriods"
        />
        <span class="error" v-if="datesError"
          >Lütfen giriş çıkış tarihlerini seçiniz</span
        >
      </div>
      <div class="selector-field">
        <label for="adults">Yetişkin Sayısı</label>
        <select
          name="adults"
          v-model="booking.adult"
          @change="handleAdultCount"
        >
          <option v-for="adult in adultCounts" :key="adult">{{ adult }}</option>
        </select>
        <span class="error" v-if="adultError"
          >Lütfen yetişkin sayısını giriniz</span
        >
      </div>
      <div class="selector-field">
        <label for="childs">Çocuk Sayısı</label>
        <select
          name="childs"
          v-model="booking.child"
          :disabled="!getSelectChildStatus"
          @change="handleChildCount"
        >
          <option v-for="child in childCounts" :key="child">{{ child }}</option>
        </select>
        <span class="error" v-if="!getSelectChildStatus">
          Çocuk ziyaretçi kabul edilmiyor!</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import HotelDatePicker from "vue-hotel-datepicker";
import "vue-hotel-datepicker/dist/vueHotelDatepicker.css";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "HotelPrepareView",
  components: {
    HotelDatePicker,
  },
  data() {
    return {
      adultError: false,
      datesError: false,
      hotelError: false,
    };
  },
  computed: {
    ...mapState({
      hotels: (state) => state.bookingStore.hotels,
      selectedHotel: (state) => state.bookingStore.selectedHotel,
      booking: (state) => state.bookingStore.booking,
      childCounts: (state) => state.bookingStore.childCounts,
      datePickerLangSetting: (state) =>
        state.bookingStore.datePickerLangSetting,
    }),
    ...mapGetters({
      getSelectChildStatus: "bookingStore/getSelectChildStatus",
      adultCounts: "bookingStore/getAdultCounts",
    }),
  },
  created() {
    this.fetchHotels();
    this.fetchHotelDetails();
  },
  mounted() {
    EventBus.$on("saveForm", this.saveFormHandler);
    EventBus.$emit("showBack", false);
    EventBus.$emit("showFooter", true);
    EventBus.$emit("showProgressBar", true);
    this.setFormStep(1);
    const lastBooking = localStorage.getItem("lastBooking")
      ? JSON.parse(localStorage.getItem("lastBooking"))
      : null;
    if (lastBooking) {
      this.setBooking(lastBooking);
      this.$refs.hoteldatesform.checkIn = new Date(lastBooking.start_date);
      this.$refs.hoteldatesform.checkOut = new Date(lastBooking.end_date);
    } else {
      this.resetForm();
    }
  },
  destroyed() {
    EventBus.$off("saveForm", this.saveFormHandler);
  },
  methods: {
    ...mapActions({
      fetchHotels: "bookingStore/fetchHotels",
      fetchHotelDetails: "bookingStore/fetchHotelDetails",
      setHotelDetail: "bookingStore/setHotelDetail",
      setHotel: "bookingStore/setHotel",
      setBooking: "bookingStore/setBooking",
      setFormStep: "bookingStore/setFormStep",
      resetForm: "bookingStore/resetForm",
    }),
    handlePeriods(mouseEvent, checkInDate, checkOutDate) {
      this.setBooking({
        start_date: this.getDateWithFormat(checkInDate),
        end_date: this.getDateWithFormat(checkOutDate),
      });
      this.datesError = false;
    },
    getDateWithFormat(date_obj) {
      const currentMonth = date_obj.getMonth() + 1;
      const monthString = currentMonth < 10 ? "0" + currentMonth : currentMonth;
      const currentDay = date_obj.getDate();
      const dayString = currentDay < 10 ? "0" + currentDay : currentDay;
      return [date_obj.getFullYear(), monthString, dayString].join("-");
    },
    handleClearPeriods() {
      if (
        !this.$refs.hoteldatesform.checkIn ||
        !this.$refs.hoteldatesform.checkOut
      ) {
        this.setBooking({
          start_date: "",
          end_date: "",
        });
      }
    },
    handleHotel($event) {
      this.hotelError = false;
      this.setHotel(
        $event.target.options[$event.target.options.selectedIndex].text
      );
      this.setBooking({
        hotel_id: $event.target.value,
        adult: 0,
        child: 0,
        room_scenic: 0,
        room_type: 0,
      });
      this.setHotelDetail(parseInt($event.target.value));
    },
    handleAdultCount($event) {
      this.setBooking({ adult: $event.target.value });
      this.adultError = false;
    },
    handleChildCount($event) {
      this.setBooking({ child: $event.target.value });
    },
    saveFormHandler() {
      if (!this.booking.hotel_id) {
        this.hotelError = true;
      }
      if (!this.booking.start_date && !this.booking.end_date) {
        this.datesError = true;
      }
      if (!parseInt(this.booking.adult)) {
        this.adultError = true;
      }
      if (!this.adultError && !this.datesError && !this.hotelError) {
        localStorage.setItem("lastBooking", JSON.stringify(this.booking));
        this.$router.push("/detail");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.main-container {
  .selector-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    margin: 10px;
    label {
      font-size: 17px;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
    }
  }
  .selector-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    column-gap: 2em;
    margin: 20px 0;
    .date-picker {
      margin: 10px;
      flex-grow: 1;
    }
  }
  .error {
    display: flex;
    align-self: baseline;
    font-size: 13px;
    color: #dc3545;
  }
}
</style>
