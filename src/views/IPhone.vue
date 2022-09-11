<script setup lang="ts">
import { ref, onBeforeMount, onMounted, Ref, watch } from "vue";
import Ringtone from "../assets/iphone.mp3";
import IncomingCall from "../components/IncomingCall.vue";
import OnACall from "../components/OnACall.vue";
import CallDetails from "../components/CallDetails.vue";
import Music from "../components/Music.vue";

onBeforeMount(() => {
  currentTime();
  date.value = formatDate();
});

onMounted(() => {
  setTimeout(() => {
    showMusic.value = true;
  }, 2000);
});

const ringtone = new Audio(Ringtone);

const date = ref("");

const clock = ref("9:41");

const toggleNetworkIcons = ref(true);

const showMusic = ref(false);

const dynamicIsland = ref("initial");

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

const zeroPadding = (num: number, digit: number) => {
  var zero = "";
  for (var i = 0; i < digit; i++) {
    zero += "0";
  }
  return (zero + num).slice(-digit);
};

setTimeout(() => {
  toggleNetworkIcons.value = false;
  dynamicIsland.value = "incomingCall";
  showMusic.value = false;
  ringtone.play();
}, 10000);

setInterval(currentTime, 1000);

const answerCall = () => {
  ringtone.pause();
  dynamicIsland.value = "onACall";
};

const declineCall = () => {
  ringtone.pause();
  dynamicIsland.value = "initial";
};

const formatDate = () => {
  const today = new Date();
  const newDate = new Intl.DateTimeFormat("en-ng", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(today));

  return newDate;
};

watch(dynamicIsland, () => {
  if (dynamicIsland.value === "initial") {
    toggleNetworkIcons.value = true;
  }
});
</script>

<template>
  <div class="relative my-10">
    <div
      class="w-[80vw] sm:w-[350px] min-h-[95vh] max-h-[600px] sm:h-[700px] mx-auto relative flex justify-center rounded-3xl border border-black"
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
                  v-if="dynamicIsland === 'initial'"
                  class="h-7 w-[25%] p-1 flex justify-end items-center rounded-2xl bg-black"
                ></div>

                <div v-if="dynamicIsland === 'incomingCall'">
                  <IncomingCall
                    @pick-call="answerCall"
                    @end-call="declineCall"
                  />
                </div>

                <div v-if="dynamicIsland === 'onACall'" class="h-7 w-[60%]">
                  <OnACall @call-details="dynamicIsland = 'callDetails'" />
                </div>

                <div v-if="dynamicIsland === 'callDetails'">
                  <CallDetails @end-call="dynamicIsland = 'initial'" />
                </div>

                <div class="flex justify-center items-center gap-[6px]">
                  <i v-if="toggleNetworkIcons" class="fa fa-signal"></i>
                  <i v-if="toggleNetworkIcons" class="fa fa-wifi"></i>
                  <div class="flex items-center gap-[3px]">
                    <i class="fa fa-battery-full"></i>
                    <div
                      v-if="dynamicIsland === 'onACall'"
                      class="h-[7px] w-[7px] bg-orange-400 rounded-full"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col mx-auto mt-16">
              <div>
                <p class="text-gray-600 text-center">{{ date }}</p>
              </div>
              <h1 class="text-[70px] text-white">{{ clock }}</h1>
            </div>

            <div v-if="showMusic">
              <Music />
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
      </div>
    </div>
  </div>
</template>

<style></style>
