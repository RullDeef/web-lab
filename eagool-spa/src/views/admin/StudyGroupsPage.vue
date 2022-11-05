<script setup lang="ts">
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import StudyGroupsTable from '@/components/admin/StudyGroupsTable.vue';
import GroupRegisterForm from '@/components/admin/forms/GroupRegisterForm.vue';
import Pager from '@/components/utils/Pager.vue';
</script>

<script lang="ts">
import injector from 'vue-inject';
import { StudyGroup } from '../../models/study-group';
import { StudyGroupsService } from '../../services/study-groups.service';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      currentPage: 0,
      groups: [] as StudyGroup[],
    };
  },

  computed: {
    groupsService(): StudyGroupsService {
      return injector.get('studyGroupsService');
    },
  },

  async mounted() {
    this.groups = await this.groupsService.getAllPaged(this.currentPage);
  },

  methods: {
    async editStudents(group: StudyGroup) {
      const editStudentsModalRoot =
        document.querySelector('#edit-students')?.parentElement;
      if (
        editStudentsModalRoot === undefined ||
        editStudentsModalRoot === null
      ) {
        console.error('modal for editing students not found');
        return;
      }
      const editStudentsModal = new Modal(editStudentsModalRoot);
      editStudentsModal.show();
    },

    async editTutor(group: StudyGroup) {
      const editTutorModalRoot =
        document.querySelector('#edit-tutor')?.parentElement;
      if (editTutorModalRoot === undefined || editTutorModalRoot === null) {
        console.error('modal for editing tutor not found');
        return;
      }
      const editTutorModal = new Modal(editTutorModalRoot);
      editTutorModal.show();
    },

    async deleteGroup(id: number) {
      await this.groupsService.deleteGroup(id);
    },

    async toPrevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.groups = await this.groupsService.getAllPaged(this.currentPage);
      }
    },

    async toNextPage() {
      const newGroups = await this.groupsService.getAllPaged(
        this.currentPage + 1,
      );
      if (newGroups.length > 0) {
        this.currentPage++;
        this.groups = newGroups;
      }
    },
  },
};
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
