<template>
  <div class="footer-container" :class="[{ 'float-right': !showBack }]">
    <button v-if="showBack" class="back" @click="handleGoBack">Geri</button>
    <button class="submit-booking" @click="handleSaveForm">
      {{ handleFormText }}
    </button>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  name: "MainFooter",
  data() {
    return {
      showBack: false,
      handleFormText: "Kaydet ve Devam Et",
    };
  },
  mounted() {
    EventBus.$on("showBack", (state) => {
      this.showBack = state;
    });
    EventBus.$on("handleFormText", (text) => {
      this.handleFormText = text;
    });
  },
  methods: {
    handleSaveForm() {
      EventBus.$emit("saveForm");
    },
    handleGoBack() {
      EventBus.$emit("goBack");
    },
  },
};
</script>

<style lang="less" scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #00b4d8;
  color: #fff;
  border-radius: 8px;
  &.float-right {
    justify-content: flex-end;
  }
}
</style>
