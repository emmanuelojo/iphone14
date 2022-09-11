<script lang="ts" setup>
import { ref } from "vue";
import MusicPlaying from "./MusicPlaying.vue";
</script>

<template>
  <div class="absolute bottom-[120px] left-4 right-4 bg-black rounded-[30px]">
    <div class="px-3 pt-3 flex justify-between">
      <div class="flex items-center gap-2">
        <img
          src="https://i.scdn.co/image/ab67616d0000b2736c32fd4910e4aacea6143e7a"
          alt="Music Image"
          class="text-[9px] w-14 h-14 rounded-lg object-cover"
        />

        <div>
          <p class="text-xs text-white font-semibold">Spread the ops</p>
          <p class="text-xs text-gray-400 font-medium">Lecrae</p>
        </div>
      </div>

      <MusicPlaying />
    </div>

    <div class="px-3 pt-2 pb-5 flex flex-col gap-[10px]">
      <div class="flex items-center gap-2">
        <p class="text-gray-400 text-[9px]">2:50</p>
        <div class="h-[6px] bg-gray-400 flex flex-grow rounded-lg">
          <div class="h-[6px] bg-white rounded-l-full w-4/5"></div>
        </div>
        <p class="text-gray-400 text-[9px]">-0:51</p>
      </div>

      <div class="relative flex justify-center text-white">
        <div class="flex justify-center items-center gap-5">
          <i class="text-[18px] fa fa-backward" aria-hidden="true"></i>
          <i class="text-[18px] fa fa-pause" aria-hidden="true"></i>
          <i class="text-[18px] fa fa-forward" aria-hidden="true"></i>
        </div>

        <div class="absolute right-1">
          <span class="material-symbols-outlined text-[15px]"> podcasts </span>
        </div>
      </div>
    </div>
  </div>
</template>
