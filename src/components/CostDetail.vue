<template>
  <div class="cost-detail-container">
    <div class="cost">
      <p class="prop">Oda Fiyatı</p>
      <p class="value">{{ roomPrice | currency }} TL</p>
    </div>
    <div class="cost">
      <p class="prop">Fiyat Etki Oranı</p>
      <p class="value">%{{ scenicRate }}</p>
    </div>
    <div class="cost">
      <p class="prop">
        Konaklama <span>({{ nightsCount }} gün)</span>
      </p>
      <p class="value">{{ (nightsCount * roomPrice) | currency }} TL</p>
    </div>
    <div class="cost" v-if="booking.coupon && booking.coupon.code">
      <p class="prop">
        İndirim <span>({{ booking.coupon.code }})</span>
      </p>
      <p class="value">- {{ booking.coupon.discount_ammount }} TL</p>
    </div>
    <hr />
    <div class="cost total">
      <p class="prop">TOPLAM TUTAR</p>
      <p class="value">{{ total | currency }} TL</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "CostDetail",
  computed: {
    ...mapState({
      booking: (state) => state.bookingStore.booking,
    }),
    ...mapGetters({
      nightsCount: "bookingStore/getNightsCount",
      roomPrice: "bookingStore/getRoomPrice",
      scenicRate: "bookingStore/getRoomScenicRate",
      total: "bookingStore/getTotal",
    }),
  },
};
</script>

<style lang="less" scoped>
.cost-detail-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  background-color: #fff;
  padding: 16px 8px;
  border-radius: 8px;
  row-gap: 5px;
  .cost {
    display: flex;
    justify-content: space-between;
    width: 100%;
    &.total {
      flex-direction: column;
      justify-content: center;
      .prop {
        font-size: 13px;
      }
      .value {
        font-weight: bold;
        font-size: 30px;
      }
    }
    .prop {
      font-size: 15px;
      font-weight: bold;
      span {
        font-size: 15px;
        font-weight: normal;
      }
    }
  }
  hr {
    border: 1px solid #e9e9e9;
    width: calc(100% + 16px);
    margin: 10px 20px;
  }
}
</style>