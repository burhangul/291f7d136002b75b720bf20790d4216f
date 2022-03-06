<template>
  <div class="reservation-container">
    <div class="reservation-info">
      <i class="reservation-completed"></i>
      <h1 class="title">Rezervasyon kaydınız alınmıştır.</h1>
      <p class="sub-title">
        Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda
        değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri
        kullanabilirsiniz.
      </p>
      <div class="link-container">
        <button @click="handleResetForm">Yeni Rezervasyon Yap</button
        ><button @click="handleEditReservation">Rezervasyonu Güncelle</button
        ><button @click="showModal()">Rezervasyonu İptal Et</button>
      </div>
    </div>
    <ReservationDetail :showCouponForm="false" />
    <CustomModal
      v-show="isModalVisible"
      @close="closeModal"
      @approve="handleApprove"
    >
      <template v-slot:header> Rezervasyonu Sil </template>
      <template v-slot:body>
        Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?
      </template>
    </CustomModal>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import { mapState, mapActions } from "vuex";
import ReservationDetail from "@/components/ReservationDetail.vue";
import CustomModal from "@/components/Modal.vue";
export default {
  name: "ReservationView",
  components: { ReservationDetail, CustomModal },
  data() {
    return {
      isModalVisible: false,
    };
  },
  computed: {
    ...mapState({
      booking: (state) => state.bookingStore.booking,
    }),
  },
  mounted() {
    if (!this.booking.lastReservationId) {
      this.$router.push({ name: "home" }).catch(() => {});
    }
    EventBus.$emit("showFooter", false);
    EventBus.$emit("showProgressBar", false);
  },
  methods: {
    ...mapActions({
      resetForm: "bookingStore/resetForm",
    }),
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleResetForm() {
      this.resetForm();
      this.$router.push({ name: "home" }).catch(() => {});
    },
    handleEditReservation() {
      localStorage.setItem(
        "lastBooking",
        JSON.stringify(this.resetCreditCardFromLastReservation())
      );
      localStorage.removeItem("lastReservation");
      this.$router.push({ name: "home" }).catch(() => {});
    },
    resetCreditCardFromLastReservation() {
      let lastReservation = JSON.parse(localStorage.getItem("lastReservation"));
      lastReservation["cc"]["card_name"] = "";
      lastReservation["cc"]["card_number"] = "";
      lastReservation["cc"]["card_date_month"] = "";
      lastReservation["cc"]["card_date_year"] = "";
      lastReservation["cc"]["card_cvv"] = "";
      return lastReservation;
    },
    handleApprove() {
      this.closeModal();
      const _url =
        "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/" +
        this.booking.lastReservationId;
      this.$axios.delete(_url).then((response) => {
        if (response.status == 200) {
          this.$toast.success(
            "Rezervasyon kaydınız başarıyla iptal edilmiştir"
          );
          this.resetForm();
          localStorage.removeItem("lastReservation");
          this.$router.push({ name: "home" }).catch(() => {});
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.reservation-container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-top: 20px;
  .reservation-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    padding: 20px;
    .title,
    .sub-title {
      max-width: 580px;
      margin-bottom: 10px;
    }
    .sub-title {
      font-size: 15px;
      line-height: 18px;
    }
    .reservation-completed {
      width: 45px;
      height: 45px;
      display: block;
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.88 119.75' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M91.89 57.78a31 31 0 1 1-31 31 31 31 0 0 1 31-31zm-22-53.72c0-2.23 2.2-4.06 5-4.06s5 1.82 5 4.06v17.77c0 2.23-2.2 4.06-5 4.06s-5-1.82-5-4.06V4.06zm-56.4 53.45c-.29 0-.54-1.23-.54-2.75s.22-2.73.54-2.73H27c.28 0 .53 1.23.53 2.73s-.22 2.75-.53 2.75zm21.54 0c-.28 0-.53-1.23-.53-2.75S34.72 52 35 52h13.55c.28 0 .53 1.23.53 2.73s-.22 2.75-.53 2.75zm21.55 0c-.28 0-.53-1.23-.53-2.75s.22-2.73.53-2.73H70.1c.28 0 .53 1.22.53 2.72a41.48 41.48 0 0 0-3.9 2.76zM13.52 73.23c-.28 0-.54-1.23-.54-2.75s.22-2.74.54-2.74H27c.28 0 .53 1.23.53 2.74s-.22 2.75-.53 2.75zm21.54 0c-.28 0-.53-1.23-.53-2.75s.22-2.74.53-2.74h13.52c.28 0 .53 1.23.53 2.74s-.22 2.75-.53 2.75zM13.55 89c-.28 0-.54-1.23-.54-2.74s.23-2.75.54-2.75h13.51c.28 0 .53 1.23.53 2.75S27.37 89 27.06 89zm21.54 0c-.28 0-.53-1.23-.53-2.74s.22-2.75.53-2.75h13.52c.28 0 .53 1.23.53 2.75S48.92 89 48.61 89zM25.36 4.06c0-2.23 2.2-4.06 4.95-4.06s4.95 1.82 4.95 4.06v17.77c0 2.23-2.21 4.06-4.95 4.06s-4.95-1.82-4.95-4.06V4.06zM5.45 38.84h94.34V18.39a2.51 2.51 0 0 0-2.5-2.5h-9a2.75 2.75 0 1 1 0-5.49h9a8 8 0 0 1 8 8v32.47a41.1 41.1 0 0 0-5.57-1.49v-5.07H5.45v53A2.47 2.47 0 0 0 6.19 99a2.51 2.51 0 0 0 1.81.77h44.78a39.14 39.14 0 0 0 1.93 5.55H8A8 8 0 0 1 2.35 103 7.88 7.88 0 0 1 0 97.32V18.41a8 8 0 0 1 8-8h9.66a2.75 2.75 0 0 1 0 5.49H8a2.46 2.46 0 0 0-1.76.73 2.54 2.54 0 0 0-.73 1.77v20.45h-.06zm37.74-23a2.75 2.75 0 1 1 0-5.49h18.4a2.75 2.75 0 1 1 0 5.49zM82.58 83.5l5.83 5.55L100.5 76.8c1-1 1.62-1.82 2.85-.56l4 4.08c1.3 1.29 1.23 2 0 3.25L90.68 100c-2.59 2.54-2.14 2.7-4.78.09l-10-10a1.16 1.16 0 0 1 .1-1.81l4.62-4.78c.69-.73 1.25-.69 2 0z' fill-rule='evenodd'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
    }
    .link-container {
      display: flex;
      column-gap: 10px;
    }
  }
}
</style>
