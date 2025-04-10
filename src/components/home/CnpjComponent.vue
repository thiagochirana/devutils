<template>
  <section class="border border-slate-50 p-4 rounded-xl bg-white shadow-md">
    <div class="flex flex-wrap items-center gap-2 justify-between mb-2">
      <h2 class="text-emerald-500 text-xl font-bold">CNPJ</h2>
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="mascara" class="accent-green-600">
        <span>máscara</span>
        <input type="checkbox" v-model="comLetras" class="ml-4 accent-green-600">
        <span>alfanumérico</span>
      </div>
    </div>
    <div class="flex items-center justify-between mb-2">
      <p class="font-mono break-all">{{ cnpj }}</p>
    </div>
    <div class="flex items-center justify-between">
      <button @click="gerarCnpj" class="bg-emerald-700 hover:bg-green-400 text-white px-4 py-1 rounded transition-colors cursor-pointer">GERAR</button>
      <button @click="copiar" class="border border-gray-200 px-2 py-1 rounded text-sm cursor-copy hover:bg-green-300 transition-colors hover:border-0">COPIAR</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const mascara = ref(true)
    const comLetras = ref(false)
    const cnpj = ref('00.111.222/0001-00')

    function gerarCnpj() {
      if (comLetras.value) {
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        const prefix = Array.from({ length: 12 }, () =>
          letras[Math.floor(Math.random() * letras.length)]
        )

        const values = prefix.map(c => {
          const code = c.charCodeAt(0)
          return code >= 65 ? code - 48 : parseInt(c) // A-Z = 17–42, 0–9 = 0–9
        })

        const d1 = calcMod11(values, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
        const d2 = calcMod11([...values, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])

        const full = [...prefix, d1.toString(), d2.toString()].join('')
        cnpj.value = mascara.value ? formatAlfaCnpj(full) : full
      } else {
        const n = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10))
        const d1 = calcMod11(n, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
        const d2 = calcMod11([...n, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
        const base = [...n, d1, d2].join('')
        cnpj.value = mascara.value
          ? base.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
          : base
      }
    }

    function calcMod11(arr: (number | string)[], pesos: number[]): number {
      const soma = arr.reduce((acc, val, i) => acc + Number(val) * pesos[i], 0)
      const resto = soma % 11
      return resto < 2 ? 0 : 11 - resto
    }

    function formatAlfaCnpj(str: string): string {
      return str.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/, '$1.$2.$3/$4-$5')
    }

    function copiar() {
      navigator.clipboard.writeText(cnpj.value)
    }

    return { mascara, comLetras, cnpj, gerarCnpj, copiar }
  }
})
</script>
