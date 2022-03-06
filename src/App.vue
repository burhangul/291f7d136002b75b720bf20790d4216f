<template>
  <div id="app">
    <MainHeader />
    <BookingLayout>
      <router-view />
    </BookingLayout>
  </div>
</template>
<script>
import BookingLayout from "@/components/Layout.vue";
import MainHeader from "@/components/Header.vue";
export default {
  components: { BookingLayout, MainHeader },
};
</script>
<style lang="less">
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
input {
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 10px;
}
button {
  display: inline-block;
  font-weight: 400;
  cursor: pointer;
  text-align: center;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #fff;
  background-color: #03045e;
  border-color: #caf0f8;
  border-radius: 0.25rem;
  &:hover {
    color: #fff;
    background-color: #03045e;
    border-color: #caf0f8;
  }
}
select {
  display: inline-block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center 8px 10px;
}
</style>
