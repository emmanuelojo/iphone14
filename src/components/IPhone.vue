<script setup lang="ts">
import { ref, onBeforeMount, onMounted, Ref, watch } from "vue";
import Ringtone from "../assets/iphone.mp3";

onBeforeMount(() => {
  currentTime();
  formatDate();
});

onMounted(() => {
  setTimeout(() => {
    showMusic.value = true;
  }, 2000);
});

const audioRef = ref() as Ref<HTMLAudioElement>;

const ringtone = new Audio(Ringtone);

const clock = ref("9:41");

const callDuration = ref("00:00");

const hrs = ref(0);

const mins = ref(0);

const sec = ref(0);

const toggleNetworkIcons = ref(true);

const showMusic = ref(false);

const activeIsland = ref("initial");

const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const currentTime = () => {
  var cd = new Date();
  const time =
    zeroPadding(cd.getHours(), 2) + ":" + zeroPadding(cd.getMinutes(), 2);
  const date =
    zeroPadding(cd.getFullYear(), 4) +
    "-" +
    zeroPadding(cd.getMonth() + 1, 2) +
    "-" +
    zeroPadding(cd.getDate(), 2) +
    " " +
    week[cd.getDay()];

  clock.value = time;
};

const zeroPadded = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

const zeroPadding = (num: number, digit: number) => {
  var zero = "";
  for (var i = 0; i < digit; i++) {
    zero += "0";
  }
  return (zero + num).slice(-digit);
};

const counter = ref(1);

const updateCallDuration = () => {
  let hours = Math.floor(counter.value / 3600);
  let minutes = Math.floor(counter.value / 60);
  let seconds = counter.value % 60;

  sec.value = seconds;
  mins.value = minutes;

  callDuration.value = `${zeroPadded(mins.value)}:${zeroPadded(sec.value)}`;

  if (activeIsland.value === "onACall") counter.value++;
};

setInterval(updateCallDuration, 1000);

setTimeout(() => {
  toggleNetworkIcons.value = false;
  //   activeIsland.value = "callDetails";
  activeIsland.value = "incomingCall";
  showMusic.value = false;
  // activeIsland.value = "musicLarge";
  ringtone.play();
}, 10000);

setInterval(currentTime, 1000);

const answerCall = () => {
  ringtone.pause();
  activeIsland.value = "onACall";
};

const formatDate = () => {
  const today = new Date();
  const newDate = new Intl.DateTimeFormat("en-ng", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(today));

  return newDate;
};

watch(activeIsland, () => {
  if (activeIsland.value === "initial") {
    toggleNetworkIcons.value = true;
  }
});
</script>

<template>
  <div class="relative my-10">
    <div
      class="w-[80vw] sm:w-[350px] h-screen sm:h-[700px] mx-auto relative flex justify-center rounded-3xl border border-black"
    >
      <div class="w-full p-[2px] flex justify-center rounded-3xl bg-gray-500">
        <div class="w-full p-2 flex justify-center rounded-3xl bg-black">
          <div
            class="w-full p-1 flex flex-col rounded-3xl bg-lockscreen bg-cover"
          >
            <div class="w-full rounded-3xl">
              <div class="mt-1 flex justify-around items-center text-white">
                <p>{{ clock }}</p>

                <div
                  class="absolute top-[22px] left-1/2 h-5 w-5 flex justify-center items-center rounded-full bg-[rgba(222,216,216,0.2)]"
                  style="z-index: 10"
                >
                  <div class="h-3 w-3 rounded-full bg-[#394853]"></div>
                </div>

                <div
                  v-if="activeIsland === 'initial'"
                  class="h-7 w-[25%] p-1 flex justify-end items-center rounded-2xl bg-black"
                ></div>

                <!-- <div
                  v-if="activeIsland === 'musicLarge'"
                  class="absolute top-[18px] left-4 right-4 bg-black rounded-[30px]"
                >
                  <div class="px-3 pt-3 flex justify-between">
                    <div class="flex items-center gap-2">
                      <img
                        src="https://i.scdn.co/image/ab67616d0000b2736c32fd4910e4aacea6143e7a"
                        alt="Music Image"
                        class="text-[9px] w-14 h-14 rounded-lg object-cover"
                      />

                      <div>
                        <p class="text-xs text-white font-semibold">
                          Spread the ops
                        </p>
                        <p class="text-xs text-gray-400 font-medium">Lecrae</p>
                      </div>
                    </div>

                    <span class="material-symbols-outlined text-white">
                      graphic_eq
                    </span>
                  </div>

                  <div class="px-3 pt-2 pb-5 flex flex-col gap-[10px]">
                    <div class="flex items-center gap-2">
                      <p class="text-gray-400 text-[9px]">2:50</p>
                      <div
                        class="h-[6px] bg-gray-400 flex flex-grow rounded-lg"
                      >
                        <div
                          class="h-[6px] bg-white rounded-l-full w-4/5"
                        ></div>
                      </div>
                      <p class="text-gray-400 text-[9px]">-0:51</p>
                    </div>

                    <div class="relative flex justify-center text-white">
                      <div class="flex justify-center items-center gap-5">
                        <i
                          class="text-[18px] fa fa-backward"
                          aria-hidden="true"
                        ></i>
                        <i
                          class="text-[18px] fa fa-pause"
                          aria-hidden="true"
                        ></i>
                        <i
                          class="text-[18px] fa fa-forward"
                          aria-hidden="true"
                        ></i>
                      </div>

                      <div class="absolute right-1">
                        <span class="material-symbols-outlined text-[15px]">
                          podcasts
                        </span>
                      </div>
                    </div>
                  </div>
                </div> -->

                <div
                  v-if="activeIsland === 'incomingCall'"
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
                      @click="activeIsland = 'initial'"
                      class="h-12 w-12 bg-red-500 rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-white">
                        call_end
                      </span>
                    </div>
                    <div
                      @click="answerCall"
                      class="h-12 w-12 bg-green-500 rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-white">
                        call
                      </span>
                      <!-- <i class="fa fa-phone text-white" aria-hidden="true"></i> -->
                    </div>
                  </div>
                </div>

                <div
                  v-if="activeIsland === 'onACall'"
                  @click="activeIsland = 'callDetails'"
                  class="h-7 w-[60%] py-1 px-2 flex justify-between items-center rounded-2xl bg-black cursor-pointer"
                >
                  <div class="flex items-center gap-1 text-green-500">
                    <i class="fa fa-phone text-[13px]" aria-hidden="true"></i>
                    <p class="text-[13px]">{{ callDuration }}</p>
                  </div>

                  <div>
                    <span
                      class="material-symbols-outlined text-green-200 text-sm"
                    >
                      tune
                    </span>
                  </div>
                </div>

                <div
                  v-if="activeIsland === 'callDetails'"
                  class="absolute top-[18px] left-4 right-4 p-2 bg-black rounded-3xl"
                >
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
                      <span class="material-symbols-outlined text-gray-400">
                        info
                      </span>
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
                      @click="activeIsland = 'initial'"
                      class="h-10 w-10 rounded-full flex justify-center items-center bg-red-500 text-white cursor-pointer"
                    >
                      <span class="material-symbols-outlined"> close </span>
                    </div>
                  </div>
                </div>

                <div class="flex justify-center items-center gap-[6px]">
                  <i v-if="toggleNetworkIcons" class="fa fa-signal"></i>
                  <i v-if="toggleNetworkIcons" class="fa fa-wifi"></i>
                  <div class="flex items-center gap-[3px]">
                    <i class="fa fa-battery-full"></i>
                    <div
                      v-if="activeIsland === 'onACall'"
                      class="h-[7px] w-[7px] bg-orange-400 rounded-full"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col mx-auto mt-16">
              <!-- <div>{{ formatDate() }}</div> -->
              <div>
                <p class="text-gray-600 text-center">Friday, September 9</p>
              </div>
              <h1 class="text-[70px] text-white">{{ clock }}</h1>
            </div>

            <div
              v-if="showMusic"
              class="absolute bottom-[120px] left-4 right-4 bg-black rounded-[30px]"
            >
              <div class="px-3 pt-3 flex justify-between">
                <div class="flex items-center gap-2">
                  <img
                    src="https://i.scdn.co/image/ab67616d0000b2736c32fd4910e4aacea6143e7a"
                    alt="Music Image"
                    class="text-[9px] w-14 h-14 rounded-lg object-cover"
                  />

                  <div>
                    <p class="text-xs text-white font-semibold">
                      Spread the ops
                    </p>
                    <p class="text-xs text-gray-400 font-medium">Lecrae</p>
                  </div>
                </div>

                <span class="material-symbols-outlined text-white">
                  graphic_eq
                </span>
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
                    <i
                      class="text-[18px] fa fa-backward"
                      aria-hidden="true"
                    ></i>
                    <i class="text-[18px] fa fa-pause" aria-hidden="true"></i>
                    <i class="text-[18px] fa fa-forward" aria-hidden="true"></i>
                  </div>

                  <div class="absolute right-1">
                    <span class="material-symbols-outlined text-[15px]">
                      podcasts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute bottom-3 left-0 right-0 flex flex-col gap-10">
              <div class="px-10 flex justify-between items-center">
                <div
                  class="h-10 w-10 bg-n-black-10% rounded-full flex justify-center items-center"
                >
                  <span class="material-symbols-outlined text-white">
                    flashlight_on
                  </span>
                </div>

                <div
                  class="h-10 w-10 bg-n-black-10% rounded-full flex justify-center items-center"
                >
                  <!-- <i class="fa fa-camera" aria-hidden="true"></i> -->
                  <span class="material-symbols-outlined text-white">
                    photo_camera
                  </span>
                </div>
              </div>

              <div class="h-[6px] w-[30%] mx-auto bg-white rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute -left-[6px] top-[20%] flex flex-col">
        <div class="h-5 w-[6px] bg-gray-700 rounded-md"></div>
        <div class="mt-6 h-10 w-[6px] bg-gray-700 rounded-md"></div>
        <div class="mt-4 h-10 w-[6px] bg-gray-700 rounded-md"></div>
        <!-- <div class="mt-4 h-10 w-[3px] -left-[3px] bg-gray-700 rounded-md"></div> -->
      </div>
    </div>

    <!-- <audio ref="audio">
      <source src="../assets/iphone.mp3" type="audio/mpeg" />
    </audio> -->
  </div>
</template>

<style></style>
