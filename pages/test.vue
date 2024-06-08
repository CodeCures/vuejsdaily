<template>
  <div class="calendar-container mx-auto">
    <div class="calendar-header grid grid-cols-7 gap-4 text-center py-4 bg-gray-200">
      <div v-for="(day, index) in daysOfWeek" :key="index" class="text-lg font-semibold">
        {{ day }}
        <div class="text-2xl font-bold mt-2">{{ datesOfWeek[index] }}</div>
      </div>
    </div>
    <div class="calendar-body grid grid-cols-7 gap-4 p-4">
      <div class="time-slots" v-for="(day, index) in 7" :key="index">
        <div v-for="hour in hours" :key="hour" class="time-slot h-24 border border-gray-300 relative">
          <div v-if="taskExists(day, hour)" :class="getTask(day, hour).class"
            class="task absolute inset-1 p-2 rounded bg-white shadow-lg">
            <div class="font-bold">{{ getTask(day, hour).title }}</div>
            <div>{{ getTask(day, hour).description }}</div>
            <div class="text-sm">{{ getTask(day, hour).deadline }}</div>
            <div class="progress-bar mt-2">
              <div class="h-2 rounded bg-purple-500" :style="{ width: getTask(day, hour).progress + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
const datesOfWeek = Array.from({ length: 7 }, (_, i) => new Date(today.setDate(today.getDate() - today.getDay() + i)).getDate());

const hours = Array.from({ length: 14 }, (_, i) => 10 + i);

const tasks = ref([
  { day: 6, hour: 10, title: 'Web Development', description: 'Creation of data stamp', deadline: '18:00 PM', progress: 40, class: 'bg-yellow-100' },
  { day: 2, hour: 13, title: 'Web Development', description: 'Creation of data stamp', deadline: '18:00 PM', progress: 70, class: 'bg-purple-100' },
  { day: 2, hour: 15, title: 'Web Development', description: 'Creation of data stamp', deadline: '18:00 PM', progress: 90, class: 'bg-yellow-100' },
  { day: 2, hour: 18, title: 'Web Development', description: 'Creation of data stamp', deadline: '18:00 PM', progress: 30, class: 'bg-purple-100' },
  { day: 2, hour: 21, title: 'Web Development', description: 'Creation of data stamp', deadline: '18:00 PM', progress: 98, class: 'bg-yellow-100' },
]);

const taskExists = (day, hour) => {
  return tasks.value.some(task => task.day === day && task.hour === hour);
};

const getTask = (day, hour) => {
  return tasks.value.find(task => task.day === day && task.hour === hour) || {};
};
</script>

<style scoped>
.calendar-container {
  max-width: 1200px;
  margin-top: 20px;
}

.calendar-header {
  background-color: #f8f9fa;
}

.time-slot {
  position: relative;
}

.task {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
}

.progress-bar div {
  height: 8px;
  background-color: #6b46c1;
}
</style>
