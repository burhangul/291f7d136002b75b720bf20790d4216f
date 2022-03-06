<template>
  <div class="checkout-container">
    <CreditCard />
    <ReservationDetail />
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import { mapActions } from "vuex";
import CreditCard from "@/components/CreditCard.vue";
import ReservationDetail from "@/components/ReservationDetail.vue";
export default {
  name: "CheckoutView",
  components: { CreditCard, ReservationDetail },
  mounted() {
    EventBus.$emit("showBack", true);
    EventBus.$on("goBack", () => {
      this.$router.push({ name: "detail" }).catch(() => {});
    });
    EventBus.$emit("handleFormText", "Ödeme Yap ve Bitir");
    this.setFormStep(3);
    const lastBooking = localStorage.getItem("lastBooking")
      ? JSON.parse(localStorage.getItem("lastBooking"))
      : null;
    if (!lastBooking) {
      history.back();
    } else {
      this.setBooking(lastBooking);
    }
  },
  destroyed() {
    EventBus.$off("goBack", () => {
      this.$router.push({ name: "home" }).catch(() => {});
    });
  },
  methods: {
    ...mapActions({
      setBooking: "bookingStore/setBooking",
      setFormStep: "bookingStore/setFormStep",
    }),
  },
};
</script>

<style lang="less" scoped>
.checkout-container {
  display: flex;
  margin-bottom: 20px;
  column-gap: 20px;
}
@media screen and (max-width: 1024px) {
  .checkout-container {
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>
