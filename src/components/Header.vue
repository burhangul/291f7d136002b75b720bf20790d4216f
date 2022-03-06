<template>
  <div class="header-container">
    <div class="brand-container">
      <h1 class="title">Otel</h1>
      <h3 class="sub-title">Rezarvasyon Sistemi</h3>
    </div>
    <button class="submit-booking" @click="handleResetForm">
      Yeni Rezarvasyon Yap
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "MainHeader",
  methods: {
    ...mapActions({
      resetForm: "bookingStore/resetForm",
    }),
    handleResetForm() {
      this.resetForm();
      this.$router.push({ name: "home" }).catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #03045e;
  color: #fff;
  .brand-container {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    .title {
      font-size: 16px;
    }
    .sub-title {
      font-size: 12px;
    }
  }
  .submit-booking {
    align-self: center;
  }
}
@media screen and (max-width: 768px) {
  .header-container .submit-booking {
    font-size: 13px;
  }
}
</style>
