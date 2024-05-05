<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import CSSPlugin from 'gsap/CSSPlugin'
import { getWeatherByCity } from '../api/weatherApi'

gsap.registerPlugin(CSSPlugin)

const search = ref('')

onMounted(() => {
  gsap.from('.container', { opacity: 0, x: -100, duration: 1 })
})

const onSubmit = async (event: { preventDefault: () => void }) => {
  event.preventDefault()
  await getWeatherByCity(search.value)
}
</script>

<template>
  <main>
    <div class="container">
      <form @submit="onSubmit">
        <div class="input-group">
          <input v-model="search" type="search" name="search" id="search" />
          <button type="submit"><font-awesome-icon icon="search" class="icon" /></button>
        </div>
      </form>
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.container {
  padding: 20px 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
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
