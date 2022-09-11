<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["pickCall", "endCall"]);
</script>

<template>
  <div
    class="absolute top-[18px] left-4 right-4 p-2 flex justify-between items-center bg-black rounded-[30px]"
  >
    <div class="flex items-end gap-1">
      <img
        src="https://picsum.photos/200"
        alt="Profile"
        class="h-12 w-12 rounded-full object-cover"
      />

      <div class="flex flex-col gap-0">
        <p class="text-[9px] text-gray-400">mobile</p>
        <p class="text-sm text-white font-semibold">John Doe</p>
      </div>
    </div>

    <div class="flex items-center gap-[6px]">
      <div
        @click="$emit('endCall')"
        class="h-12 w-12 bg-red-500 rounded-full flex justify-center items-center cursor-pointer"
      >
        <span class="material-symbols-outlined text-white"> call_end </span>
      </div>
      <div
        @click="$emit('pickCall')"
        class="h-12 w-12 bg-green-500 rounded-full flex justify-center items-center cursor-pointer"
      >
        <span class="material-symbols-outlined text-white"> call </span>
      </div>
    </div>
  </div>
</template>
