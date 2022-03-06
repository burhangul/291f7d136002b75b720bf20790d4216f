<template>
  <div class="hotel-detail-container">
    <div class="booking-info-container">
      <h1>
        {{ booking.selectedHotel }}
        <span class="city">({{ booking.selectedHotelDetail.city }}) </span>
      </h1>
      <div class="booking">
        <div class="info-field"><span>Giriş Tarihi: </span>{{ startDate }}</div>
        <div class="info-field"><span>Çıkış Tarihi: </span>{{ endDate }}</div>
        <div class="info-field"><span>Yetişkin: </span>{{ booking.adult }}</div>
        <div class="info-field"><span>Çocuk: </span>{{ booking.child }}</div>
      </div>
    </div>
    <div class="extras">
      <h1 class="attr-main-title">En popüler özellikler</h1>
      <ul class="extra-list">
        <li v-for="(possibility, index) in possibilities" :key="index">
          {{ possibility }}
        </li>
      </ul>
    </div>
    <div class="room-attr-container">
      <h1 class="attr-main-title">Oda Tipi Seçimi</h1>
      <RoomAttribute
        attrType="TYPE"
        :attributes="booking.selectedHotelDetail.room_type"
        @handleAttr="handleRoomType"
      />
    </div>
    <div class="room-attr-container">
      <h1 class="attr-main-title">Manzara Seçimi</h1>
      <RoomAttribute
        attrType="SCENIC"
        :attributes="booking.selectedHotelDetail.room_scenic"
        @handleAttr="handleRoomScenic"
      />
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import { mapState, mapActions, mapGetters } from "vuex";
import RoomAttribute from "@/components/RoomAttribute.vue";
export default {
  name: "HotelDetailView",
  components: { RoomAttribute },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      selectedHotel: (state) => state.bookingStore.selectedHotel,
      booking: (state) => state.bookingStore.booking,
    }),
    ...mapGetters({
      startDate: "bookingStore/getStartDate",
      endDate: "bookingStore/getEndDate",
      possibilities: "bookingStore/getUniqPossibilities",
    }),
  },
  mounted() {
    this.setFormStep(2);
    const lastBooking = localStorage.getItem("lastBooking")
      ? JSON.parse(localStorage.getItem("lastBooking"))
      : null;
    if (!lastBooking) {
      history.back();
    } else {
      if (!lastBooking.room_scenic) {
        lastBooking.room_scenic =
          lastBooking.selectedHotelDetail.room_scenic[0].id;
      }
      if (!lastBooking.room_type) {
        lastBooking.room_type = lastBooking.selectedHotelDetail.room_type[0].id;
      }
      this.setBooking(lastBooking);
      localStorage.setItem("lastBooking", JSON.stringify(lastBooking));
    }
    EventBus.$emit("showBack", true);
    EventBus.$on("goBack", () => {
      this.$router.push({ name: "home" }).catch(() => {});
    });
    EventBus.$on("saveForm", this.saveFormHandler);
  },
  destroyed() {
    EventBus.$off("goBack", () => {
      this.$router.push({ name: "home" }).catch(() => {});
    });
    EventBus.$off("saveForm", this.saveFormHandler);
  },
  methods: {
    ...mapActions({
      fetchHotels: "bookingStore/fetchHotels",
      fetchHotelDetails: "bookingStore/fetchHotelDetails",
      setBooking: "bookingStore/setBooking",
      setFormStep: "bookingStore/setFormStep",
    }),
    handleRoomType(room) {
      this.setBooking({ room_type: room.id });
    },
    handleRoomScenic(room) {
      this.setBooking({ room_scenic: room.id });
    },
    saveFormHandler() {
      localStorage.setItem("lastBooking", JSON.stringify(this.booking));
      this.$router.push({ name: "checkout" });
    },
  },
};
</script>

<style lang="less" scoped>
.hotel-detail-container {
  .booking-info-container {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    background-color: #e9e9e9;
    border-radius: 8px;
    padding: 20px;
    h1 {
      font-size: 19px;
      line-height: 35px;
      span {
        font-size: 15px;
        font-weight: 500;
      }
    }
    .booking {
      display: flex;
      flex-wrap: wrap;
      .info-field {
        margin-right: 5px;
        span {
          font-weight: bold;
        }
      }
    }
  }
  .extras {
    margin: 16px 0;
    .extra-list {
      display: flex;
      flex-wrap: wrap;
      column-gap: 10px;
      margin: 16px 0;
      li {
        text-transform: capitalize;
        list-style-type: none;
      }
    }
  }
  .room-attr-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .attr-main-title {
    display: flex;
    align-self: baseline;
    width: 100%;
    border-bottom: 1px solid #ebe5e5;
    line-height: 35px;
    font-size: 19px;
  }
}
</style>
