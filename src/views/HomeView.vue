<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import gsap from 'gsap'
import CSSPlugin from 'gsap/CSSPlugin'
import { getWeatherByCity } from '../api/weatherApi'
import type WeatherDataI from '../api/weatherApi'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

gsap.registerPlugin(CSSPlugin)

const search = ref('')
let weather = ref<WeatherDataI | null>(null)

onMounted(() => {
  gsap.from('.container', { opacity: 0, x: -100, duration: 1 })
  gsap.from('.title', { opacity: 0, y: -50, duration: 1 })
})
watch(weather, () => {
  nextTick(() => {
    gsap.from('.weather', { opacity: 0, y: -20, duration: 1 })
  })
})

const onSubmit = async (event: { preventDefault: () => void }) => {
  event.preventDefault()
  try {
    const weatherData: WeatherDataI = await getWeatherByCity(search.value)
    weather.value = weatherData
  } catch (error) {
    toast.error('City not found!')
  }
}
</script>

<template>
  <main>
    <h1 class="title">Weather App</h1>
    <div class="container" :class="{ 'show-weather': weather !== null }">
      <div>
        <form @submit="onSubmit">
          <div class="input-group">
            <input v-model="search" type="search" name="search" id="search" />
            <button type="submit"><font-awesome-icon icon="search" class="icon" /></button>
          </div>
        </form>
        <div class="weather" v-if="weather !== null">
          <h1>{{ weather?.name }}</h1>
          <img :src="weather?.iconUrl" alt="" />
          <p class="temp">{{ weather?.temp }} <span>°C</span></p>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
main {
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
}
.container {
  padding: 20px 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;

  /*animation*/
  transition: max-height 1s ease-in-out;
  max-height: 100px;
  overflow: hidden;

  &.show-weather {
    max-height: 1000px; /* adjust this value as needed */
  }
}
.weather {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;

  img {
    width: 130px;
    height: 130px;
  }

  .temp {
    position: relative;
    font-size: 2rem;
    font-weight: 700;

    span {
      position: absolute;
      top: 7px;
      font-size: 1rem;
      font-weight: 400;
    }
  }
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .input-group {
    display: flex;
    align-items: center;

    background-color: transparent;
    outline: none;
    border: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    padding: 10px;
  }

  .input-group input {
    flex-grow: 1;
  }

  .input-group button {
    margin-left: 10px;
  }

  input {
    background-color: transparent;
    outline: none;
    border: none;
    color: rgba(255, 255, 255, 0.8);

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      /* height: 15px;
      width: 15px;
      background: url('path-to-your-image') no-repeat center center;
      background-size: contain; */
    }
  }
  .icon {
    color: white;
  }
  button {
    background-color: transparent;
    outline: none;
    border: none;
    margin: 0;
  }
}
@media screen and (max-width: 768px) {
}
</style>
