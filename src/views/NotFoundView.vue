<template>
  <div class="not-found-container">
    <p>Sanırız kayboldunuz sizi her şeyin başladığı o yere ışınlıyoruz...</p>
    <img src="../assets/teleport.gif" />
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  name: "NotFound",
  mounted() {
    EventBus.$emit("showFooter", false);
    EventBus.$emit("showProgressBar", false);
    setTimeout(() => {
      location.href = "/";
    }, 2300);
  },
};
</script>

<style lang="less" scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  margin-top: 20px;
  p {
    font-size: 17px;
  }
  img {
    max-width: 768px;
    margin-bottom: 20px;
  }
}
</style>