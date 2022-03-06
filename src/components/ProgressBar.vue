<template>
  <div class="progress-bar-container">
    <div class="form-state">
      <div class="state-icon" :class="[{ active: formState == 1 }]">
        <i class="calendar"></i>
      </div>
      <p :class="[{ active: formState == 1 }]">Otel ve Tarih <br />Seçimi</p>
    </div>
    <div class="form-state">
      <div class="state-icon" :class="[{ active: formState == 2 }]">
        <i class="room"></i>
      </div>
      <p :class="[{ active: formState == 2 }]">
        Oda Tipi ve Manzara <br />
        Seçimi
      </p>
    </div>
    <div class="form-state">
      <div class="state-icon" :class="[{ active: formState == 3 }]">
        <i class="checkout"></i>
      </div>
      <p :class="[{ active: formState == 3 }]">
        Önizleme ve Ödeme <br />
        İşlemleri
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ProgressBar",
  computed: {
    ...mapState({
      formState: (state) => state.bookingStore.form_step,
    }),
  },
};
</script>
<style lang="less" scoped>
.progress-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 15px;
  background-color: #e9e9e9;
  margin: 40px 0 20px 0;
  border-radius: 8px;
  font-weight: bold;
  .form-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    .state-icon {
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border: 1px solid #bab9b9;
      border-radius: 50%;
      &.active {
        border: 1px solid #383838;
      }
      i {
        display: block;
        width: 30px;
        height: 30px;
        &.calendar {
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 470 470' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M462.5 425H7.5a7.5 7.5 0 1 0 0 15h455a7.5 7.5 0 1 0 0-15zm0 30H7.5a7.5 7.5 0 1 0 0 15h455a7.5 7.5 0 1 0 0-15zm0-425h-25v-7.5C437.5 10.093 427.406 0 415 0s-22.5 10.093-22.5 22.5V30h-75v-7.5C317.5 10.093 307.406 0 295 0s-22.5 10.093-22.5 22.5V30h-75v-7.5C197.5 10.093 187.407 0 175 0s-22.5 10.093-22.5 22.5V30h-75v-7.5C77.5 10.093 67.407 0 55 0S32.5 10.093 32.5 22.5V30h-25A7.5 7.5 0 0 0 0 37.5v365a7.5 7.5 0 0 0 7.5 7.5h455a7.5 7.5 0 0 0 7.5-7.5v-365a7.5 7.5 0 0 0-7.5-7.5zm-55-7.5A7.51 7.51 0 0 1 415 15a7.51 7.51 0 0 1 7.5 7.5v30A7.51 7.51 0 0 1 415 60a7.51 7.51 0 0 1-7.5-7.5v-30zm-120 0A7.51 7.51 0 0 1 295 15a7.51 7.51 0 0 1 7.5 7.5v30A7.51 7.51 0 0 1 295 60a7.51 7.51 0 0 1-7.5-7.5v-30zm-120 0A7.51 7.51 0 0 1 175 15a7.51 7.51 0 0 1 7.5 7.5v30A7.51 7.51 0 0 1 175 60a7.51 7.51 0 0 1-7.5-7.5v-30zm-120 0A7.51 7.51 0 0 1 55 15a7.51 7.51 0 0 1 7.5 7.5v30A7.51 7.51 0 0 1 55 60a7.51 7.51 0 0 1-7.5-7.5v-30zM32.5 45v7.5C32.5 64.907 42.593 75 55 75s22.5-10.093 22.5-22.5V45h75v7.5c0 12.407 10.093 22.5 22.5 22.5s22.5-10.093 22.5-22.5V45h75v7.5c0 12.407 10.094 22.5 22.5 22.5s22.5-10.093 22.5-22.5V45h75v7.5c0 12.407 10.094 22.5 22.5 22.5s22.5-10.093 22.5-22.5V45H455v77.3H15V45h17.5zM15 395V137.3h440V395H15z'/%3E%3Cuse xlink:href='%23B'/%3E%3Cuse xlink:href='%23B' x='-81'/%3E%3Cuse xlink:href='%23B' x='-162'/%3E%3Cuse xlink:href='%23B' x='-243'/%3E%3Cuse xlink:href='%23C'/%3E%3Cuse xlink:href='%23B' x='-81' y='54'/%3E%3Cuse xlink:href='%23B' x='-162' y='54'/%3E%3Cuse xlink:href='%23B' x='-243' y='54'/%3E%3Cuse xlink:href='%23C' y='54'/%3E%3Cuse xlink:href='%23B' x='-81' y='108'/%3E%3Cuse xlink:href='%23B' y='54'/%3E%3Cuse xlink:href='%23B' y='108'/%3E%3Cuse xlink:href='%23B' x='-162' y='108'/%3E%3Cuse xlink:href='%23B' x='-243' y='108'/%3E%3Cuse xlink:href='%23C' y='108'/%3E%3Cuse xlink:href='%23B' y='-54'/%3E%3Cuse xlink:href='%23B' x='-81' y='-54'/%3E%3Cuse xlink:href='%23B' x='-162' y='-54'/%3E%3Cuse xlink:href='%23B' x='-243' y='-54'/%3E%3Cuse xlink:href='%23C' y='-54'/%3E%3Cdefs %3E%3Cpath id='B' d='M412 226.8h-30a7.5 7.5 0 1 0 0 15h30a7.5 7.5 0 1 0 0-15z'/%3E%3Cpath id='C' d='M88 226.8H58a7.5 7.5 0 1 0 0 15h30a7.5 7.5 0 1 0 0-15z'/%3E%3C/defs%3E%3C/svg%3E");
        }
        &.room {
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 315 315' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M292.617 146.484h-3.105V95.162c0-17.997-14.642-32.639-32.638-32.639H58.126c-17.996 0-32.638 14.642-32.638 32.639v51.322h-3.106C10.041 146.484 0 156.525 0 168.867v33.162c0 12.342 10.041 22.383 22.383 22.383h27.672v21.064a7 7 0 1 0 14 0v-21.064h186.891v21.064a7 7 0 1 0 14 0v-21.064h27.672c12.342 0 22.383-10.041 22.383-22.383v-33.162c-.001-12.342-10.042-22.383-22.384-22.383zM39.488 95.162c0-10.277 8.36-18.639 18.638-18.639h198.748c10.277 0 18.638 8.361 18.638 18.639v51.322h-8.974v-14.057c0-8.964-7.292-16.256-16.255-16.256h-71.754c-8.965 0-16.258 7.292-16.258 16.256v14.057h-9.543v-14.057c0-8.964-7.293-16.256-16.258-16.256H64.717c-8.963 0-16.255 7.292-16.255 16.256v14.057h-8.974V95.162zm136.783 51.322v-14.057a2.29 2.29 0 0 1 2.258-2.256h71.754a2.29 2.29 0 0 1 2.255 2.256v14.057h-76.267zm-113.809 0v-14.057a2.29 2.29 0 0 1 2.255-2.256h71.754a2.29 2.29 0 0 1 2.258 2.256v14.057H62.462zM301 202.029c0 4.622-3.761 8.383-8.383 8.383H22.383c-4.622 0-8.383-3.761-8.383-8.383v-33.162c0-4.622 3.761-8.383 8.383-8.383h270.234c4.622 0 8.383 3.761 8.383 8.383v33.162z'/%3E%3C/svg%3E");
        }
        &.checkout {
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M76.8 358.4h153.6a8.54 8.54 0 0 0 8.533-8.533 8.54 8.54 0 0 0-8.533-8.533H76.8a8.54 8.54 0 0 0-8.533 8.533A8.54 8.54 0 0 0 76.8 358.4zm426.667-136.533h-460.8a8.54 8.54 0 0 0-8.533 8.533 8.54 8.54 0 0 0 8.533 8.533h452.267v162.133c0 14.114-11.486 25.6-25.6 25.6H42.667c-11.87 0-25.6-8.755-25.6-25.6V213.333a8.54 8.54 0 0 0-8.533-8.533A8.54 8.54 0 0 0 0 213.333v187.733c0 20.506 16.614 42.667 42.667 42.667h426.667c23.526 0 42.667-19.14 42.667-42.667V230.4a8.54 8.54 0 0 0-8.534-8.533zm-34.134-153.6H42.667C19.14 68.267 0 87.407 0 110.933v51.2a8.54 8.54 0 0 0 8.533 8.533h460.8a8.54 8.54 0 0 0 8.533-8.533 8.54 8.54 0 0 0-8.533-8.533H17.067v-42.667c0-14.114 11.486-25.6 25.6-25.6h426.667c14.114 0 25.6 11.486 25.6 25.6v85.333a8.54 8.54 0 0 0 8.533 8.533 8.54 8.54 0 0 0 8.533-8.533v-85.333c0-23.526-19.14-42.666-42.667-42.666zm-170.666 256a8.54 8.54 0 0 0 8.533-8.533 8.54 8.54 0 0 0-8.533-8.533H230.4a8.54 8.54 0 0 0-8.533 8.533 8.54 8.54 0 0 0 8.533 8.533h68.267zm-221.867 0h119.467a8.54 8.54 0 0 0 8.533-8.533 8.54 8.54 0 0 0-8.533-8.533H76.8a8.54 8.54 0 0 0-8.533 8.533 8.54 8.54 0 0 0 8.533 8.533z'/%3E%3C/svg%3E");
        }
      }
    }
    p {
      color: #bab9b9;
      margin-top: 10px;
      font-size: 13px;
      &.active {
        color: #383838;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .progress-bar-container .form-state {
    min-width: 80px;
    .state-icon {
      width: 50px;
      height: 50px;
    }
    p {
      font-size: 10px;
    }
  }
}
</style>
