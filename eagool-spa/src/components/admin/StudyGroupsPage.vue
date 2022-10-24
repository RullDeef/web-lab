<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { StudyGroup } from '../../models/study-group';
import AdminNavbar from './AdminNavbar.vue';
import StudyGroupsTable from './views/StudyGroupsTable.vue';
import GroupRegisterForm from './forms/GroupRegisterForm.vue';
import AuthGuard from '../../guards/auth.guard';
import { UserRole } from '../../models/user';
import { StudyGroupsService } from '../../services/study-groups.service';
import Pager from '../utils/Pager.vue';
import { Modal } from 'bootstrap';

const currentPage = ref(0);
const groups = ref<StudyGroup[]>([]);
let editStudentsModal: Modal;
let editTutorModal: Modal;

const groupsService = inject('study-groups-service') as StudyGroupsService;

async function editStudents(group: StudyGroup) {
  editStudentsModal.show();
}

async function editTutor(group: StudyGroup) {
  editTutorModal.show();
}

async function deleteGroup(id: number) {
  await groupsService.deleteGroup(id);
}

async function toPrevPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
    groups.value = await groupsService.getAllPaged(currentPage.value);
  }
}

async function toNextPage() {
  const newGroups = await groupsService.getAllPaged(currentPage.value + 1);
  if (newGroups.length > 0) {
    currentPage.value++;
    groups.value = newGroups;
  }
}

function setupModals() {
  const editStudentsModalRoot =
    document.querySelector('#edit-students')?.parentElement;
  const editTutorModalRoot =
    document.querySelector('#edit-tutor')?.parentElement;
  if (editStudentsModalRoot === undefined || editStudentsModalRoot === null) {
    console.error('modal for editing students not found');
    return;
  }
  if (editTutorModalRoot === undefined || editTutorModalRoot === null) {
    console.error('modal for editing tutor not found');
    return;
  }

  editStudentsModal = new Modal(editStudentsModalRoot);
  editTutorModal = new Modal(editTutorModalRoot);
}

onMounted(async () => {
  await AuthGuard(UserRole.admin);
  setupModals();
  groups.value = await groupsService.getAllPaged(currentPage.value);
});
</script>

<template>
  <AdminNavbar />

  <b-container class="mt-3">
    <h3>Список учебных групп</h3>
    <StudyGroupsTable
      :groups="groups"
      :on-edit-tutor="editTutor"
      :on-edit-students="editStudents"
      :on-delete="deleteGroup"
    />

    <div class="d-flex flex-row justify-content-between align-items-baseline">
      <b-button
        variant="primary"
        data-bs-target="#register-group"
        data-bs-toggle="modal"
      >
        Добавить группу
      </b-button>

      <Pager
        :curr-page="currentPage"
        @prev-page="toPrevPage"
        @next-page="toNextPage"
      />
    </div>
  </b-container>

  <div class="modal" id="register-group">
    <GroupRegisterForm />
  </div>

  <div class="modal" id="edit-students">
    <h3>Edit Group Students</h3>
  </div>

  <div class="modal" id="edit-tutor">
    <h3>Edit Group Tutor</h3>
  </div>
</template>
