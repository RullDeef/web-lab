<script setup lang="ts">
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const modal = ref<Modal>({} as Modal);
const modalShown = ref<boolean>(false);

onMounted(() => {
  const modalRoot = document.querySelector('#modal-content')?.parentElement;
  if (modalRoot === undefined || modalRoot === null) {
    console.error('modal root is not defined');
    return;
  }

  modal.value = new Modal(modalRoot as HTMLElement);

  modalRoot.addEventListener('show.bs.modal', () => {
    modalShown.value = true;
  });

  modalRoot.addEventListener('hide.bs.modal', () => {
    modalShown.value = false;
  });
});

onBeforeRouteLeave((to, from, next) => {
  if (modalShown.value) {
    next(false);
    modal.value.hide();
  } else {
    next();
  }
});
</script>

<template>
  <div id="modal-content" class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Добавление студентов</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="form"></div>
      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Отменить
        </button>
        <button type="button" class="btn btn-primary" @click="registerUser">
          Добавить
        </button>
      </div> -->
    </div>
  </div>
</template>
