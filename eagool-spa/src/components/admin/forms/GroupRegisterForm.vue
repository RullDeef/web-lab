<script setup lang="ts">
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import StudentsChooseForm from './StudentsChooseForm.vue';

export interface GroupFormData {
  title: string;
}

function emptyGroupData(): GroupFormData {
  return {
    title: '',
  };
}

const modal = ref<Modal>({} as Modal);
const modalShown = ref<boolean>(false);
const groupData = ref<GroupFormData>(emptyGroupData());

async function registerGroup() {
  console.log('registering new group...');
}

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
        <h5 class="modal-title">Форма добавления группы</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="form">
          <div class="form-group mb-3">
            <label for="title">Название группы</label>
            <input
              id="title"
              class="form-control"
              type="text"
              name="title"
              v-model="groupData.title"
            />
          </div>
          <div class="d-flex justify-content-between align-items-baseline mb-3">
            <span>Преподаватель: Иванов И.</span>
            <b-button size="sm" variant="outline-info">
              <b-icon-pencil-fill /> Назначить
            </b-button>
          </div>
          <div class="d-flex justify-content-between align-items-baseline mb-3">
            <span>Студенты: 10 человек</span>
            <b-button
              size="sm"
              variant="outline-warning"
              data-bs-target="#choose-students"
              data-bs-toggle="modal"
            >
              <b-icon-card-list /> Редактировать
            </b-button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Отменить
        </button>
        <button type="button" class="btn btn-primary" @click="registerGroup">
          Добавить
        </button>
      </div>
    </div>
  </div>

  <div class="modal" id="choose-students">
    <StudentsChooseForm />
  </div>
</template>
