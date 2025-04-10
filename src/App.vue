<template>
  <main class="w-[320px] h-[470px] bg-slate-100 p-2 space-y-4 overflow-y-auto">
    <EmailComponent />
    <CpfComponent />
    <CnpjComponent />
    <div class="flex justify-center">
      <a
        href="https://github.com/thiagochirana/devutils"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1 transition"
      >
        <img
          src="/github.svg"
          alt="GitHub"
          class="w-4 h-4 opacity-20 hover:opacity-100 transition"
        />
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import CpfComponent from '@/components/home/CpfComponent.vue'
import EmailComponent from '@/components/home/EmailComponent.vue'
import CnpjComponent from '@/components/home/CnpjComponent.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
main {
  font-family: 'Poppins', sans-serif;
}
</style>
