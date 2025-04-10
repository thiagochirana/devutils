<template>
  <section class="border border-slate-50 p-4 rounded-xl bg-white shadow-md">
    <div class="flex items-center gap-2 mb-2 justify-between">
      <h2 class="text-emerald-500 text-xl font-bold">CPF</h2>
      <div>
        <input type="checkbox" v-model="mascara" class="accent-green-600 mr-2" />
        <span>máscara?</span>
      </div>
    </div>
    <div class="flex items-center justify-between mb-2">
      <p class="font-mono">{{ cpf }}</p>
    </div>
    <div class="flex items-center justify-between">
      <button
        @click="gerarCpf"
        class="bg-emerald-700 hover:bg-green-400 text-white px-4 py-1 rounded transition-colors cursor-pointer"
      >
        GERAR
      </button>
      <button
        @click="copiar"
        class="border border-gray-200 px-2 py-1 rounded text-sm cursor-copy hover:bg-green-300 transition-colors hover:border-0"
      >
        COPIAR
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const mascara = ref(true)
    const cpf = ref('xxx.xxx.xxx-xx')

    function gerarCpf() {
      const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
      const d1 = calc(n, 10)
      const d2 = calc([...n, d1], 11)
      const base = [...n, d1, d2].join('')
      cpf.value = mascara.value ? base.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : base
    }

    function calc(arr: number[], fator: number): number {
      const soma = arr.reduce((acc, val, i) => acc + val * (fator - i), 0)
      const resto = soma % 11
      return resto < 2 ? 0 : 11 - resto
    }

    function copiar() {
      navigator.clipboard.writeText(cpf.value)
    }

    return { mascara, cpf, gerarCpf, copiar }
  },
})
</script>
