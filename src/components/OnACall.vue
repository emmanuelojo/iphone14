<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CallAnimation from "./CallAnimation.vue";

onMounted(() => {
  updateCallDuration();
});

const emit = defineEmits(["callDetails"]);

const callDuration = ref("00:00");

const counter = ref(1);

const hrs = ref(0);

const mins = ref(0);

const sec = ref(0);

const zeroPadded = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

const updateCallDuration = () => {
  let hours = Math.floor(counter.value / 3600);
  let minutes = Math.floor(counter.value / 60);
  let seconds = counter.value % 60;

  sec.value = seconds;
  mins.value = minutes;

  callDuration.value = `${zeroPadded(mins.value)}:${zeroPadded(sec.value)}`;

  counter.value++;
};

setInterval(updateCallDuration, 1000);
</script>

<template>
  <div
    @click="$emit('callDetails')"
    class="py-1 px-2 flex justify-between items-center rounded-2xl bg-black cursor-pointer"
  >
    <div class="flex items-center gap-1 text-green-500">
      <i class="fa fa-phone text-[13px]" aria-hidden="true"></i>
      <p class="text-[13px]">{{ callDuration }}</p>
    </div>

    <div>
      <CallAnimation />
    </div>
  </div>
</template>
