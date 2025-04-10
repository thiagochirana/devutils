<template>
  <section class="border border-slate-50 p-4 rounded-xl bg-white shadow-md">
    <h2 class="text-emerald-500 text-xl font-bold mb-2">EMAIL</h2>
    <div class="flex items-center justify-between mb-2">
      <p class="font-mono">{{ email }}</p>
    </div>
    <div class="flex items-center justify-between">
      <button
        @click="generate"
        class="bg-emerald-700 hover:bg-green-400 text-white px-4 py-1 rounded transition-colors cursor-pointer"
      >
        GENERATE
      </button>
      <button
        @click="copiar"
        class="border border-gray-200 px-2 py-1 rounded text-sm cursor-copy hover:bg-green-300 transition-colors hover:border-0"
      >
        COPY
      </button>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const email = ref('email@email.com')

    function generate() {
      const names = [
        'joao',
        'maria',
        'ana',
        'lucas',
        'devutils',
        'pedro',
        'thiago',
        'julio',
        'evan',
        'richard',
        'robert',
        'maynard',
        'adam',
        'justin',
        'rock',
        'louis',
        'john',
        'jesus',
        'bruna',
        'tiago',
        'efraim',
      ]
      const domains = ['@gmail.com', '@outlook.com', '@yahoo.com', '@hotmail.com']
      const name = randomizeName(names) + '.' + randomizeName(names) + Math.floor(Math.random() * 9999)
      const domain = domains[Math.floor(Math.random() * domains.length)]
      email.value = name + domain
    }

    function copiar() {
      navigator.clipboard.writeText(email.value)
    }

    function randomizeName(names: string[]): string {
      return names[Math.floor(Math.random() * names.length)]
    }

    return { email, generate, copiar }
  },
})
</script>
