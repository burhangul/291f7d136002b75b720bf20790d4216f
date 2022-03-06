<template>
  <div class="attr-container">
    <div
      class="attr-desc"
      :class="[
        {
          active:
            attr.id == (isScenic ? booking.room_scenic : booking.room_type),
        },
      ]"
      v-for="(attr, index) in attributes"
      :key="index"
      @click="$emit('handleAttr', attr)"
    >
      <h1 class="attr-title">{{ attr.title }}</h1>
      <img :src="attr.photo" :alt="attr.title" />
      <div class="attr-sub-desc">
        <div class="prop">
          <template v-if="attr.price">
            <p>{{ getNightCount }} gün</p>
            <p>{{ booking.adult }} Yetişkin</p>
          </template>
          <p v-else>Fiyat Etki Oranı</p>
        </div>
        <div class="cost">
          <p v-if="attr.price">{{ attr.price | currency }} TL</p>
          <p v-else>+ {{ attr.price_rate }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "RoomAttribute",
  props: {
    attributes: {
      type: Array,
    },
    attrType: {
      type: String,
      validator: function (value) {
        return ["TYPE", "SCENIC"].includes(value);
      },
    },
  },
  computed: {
    ...mapState({
      booking: (state) => state.bookingStore.booking,
    }),
    ...mapGetters({
      getNightCount: "bookingStore/getNightsCount",
    }),
    isScenic() {
      return this.attrType == "SCENIC";
    },
  },
};
</script>

<style lang="less" scoped>
.attr-container {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
  margin: 20px 0;
  .attr-desc {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    padding: 16px;
    margin-right: 16px;
    border: 1px solid #ebe5e5;
    border-radius: 8px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      padding: 15px;
      border: 2px solid #67ee84;
    }
    .attr-title {
      align-self: baseline;
    }
    img {
      width: 100%;
      object-fit: contain;
    }
    .attr-sub-desc {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: 500;
      .prop {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: center;
        font-size: 13px;
      }
      .cost {
        font-size: 19px;
      }
    }
  }
}
</style>
