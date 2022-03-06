<template>
  <div class="layout-container">
    <ProgressBar v-if="showProgressBar" />
    <slot></slot>
    <MainFooter v-if="showFooter" />
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import MainFooter from "@/components/Footer.vue";
import ProgressBar from "@/components/ProgressBar.vue";
export default {
  name: "BookingLayout",
  components: { MainFooter, ProgressBar },
  data() {
    return {
      showFooter: true,
      showProgressBar: true,
    };
  },
  mounted() {
    EventBus.$on("showFooter", (state) => {
      this.showFooter = state;
    });
    EventBus.$on("showProgressBar", (state) => {
      this.showProgressBar = state;
    });
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  width: 100%;
  max-width: 1056px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
}
</style>