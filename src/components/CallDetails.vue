<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["endCall"]);
</script>

<template>
  <div class="absolute top-[18px] left-4 right-4 p-2 bg-black rounded-3xl">
    <div class="flex justify-between items-center">
      <div class="flex items-end gap-1">
        <img
          src="https://picsum.photos/200"
          alt="Profile"
          class="h-12 w-12 rounded-full object-cover"
        />

        <div class="flex flex-col gap-0">
          <p class="text-sm text-white font-semibold">John Doe</p>
          <p class="text-[9px] text-gray-400">mobile</p>
        </div>
      </div>

      <div class="cursor-pointer">
        <span class="material-symbols-outlined text-gray-400"> info </span>
      </div>
    </div>

    <div class="mt-2 flex justify-between items-center">
      <div
        class="h-10 w-10 rounded-full flex justify-center items-center bg-gray-400 text-white cursor-pointer"
      >
        <i class="fa fa-volume-up" aria-hidden="true"></i>
      </div>
      <div
        class="h-10 w-10 rounded-full flex justify-center items-center bg-white text-black cursor-pointer"
      >
        <i class="fa fa-microphone" aria-hidden="true"></i>
      </div>
      <div
        class="h-10 w-10 rounded-full flex justify-center items-center bg-gray-400 text-white cursor-pointer"
      >
        <i class="fa fa-video-camera" aria-hidden="true"></i>
      </div>
      <div
        class="h-10 w-10 rounded-full flex justify-center items-center bg-gray-400 text-white cursor-pointer"
      >
        <i class="fa fa-desktop" aria-hidden="true"></i>
      </div>
      <div
        @click="$emit('endCall')"
        class="h-10 w-10 rounded-full flex justify-center items-center bg-red-500 text-white cursor-pointer"
      >
        <span class="material-symbols-outlined"> close </span>
      </div>
    </div>
  </div>
</template>
