<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog">
        <header class="modal-header">
          <slot name="header"> </slot>
          <button type="button" class="btn-close" @click="handleClose">
            x
          </button>
        </header>

        <section class="modal-body">
          <slot name="body"> </slot>
        </section>

        <footer class="modal-footer">
          <button class="btn-green" @click="handleClose">Kapat</button>
          <button class="btn-green" @click="handleApprove">
            {{ approveText }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "CustomModal",
  props: {
    approveText: {
      type: String,
      default: "Sil",
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleApprove() {
      this.$emit("approve");
    },
  },
};
</script>
<style lang="less">
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    .modal-header,
    .modal-footer {
      padding: 15px;
      display: flex;
    }
    .modal-header {
      position: relative;
      border: 1px solid #eeeeee;
      color: #03045e;
      justify-content: space-between;
      align-items: center;
    }

    .modal-footer {
      border-top: 1px solid #eeeeee;
      flex-direction: row;
      justify-content: space-between;
    }

    .modal-body {
      position: relative;
      padding: 20px 10px;
    }
  }
}
</style>
