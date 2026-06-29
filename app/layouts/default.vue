<template>
  <div class="min-h-screen flex flex-col bg-white text-slate-900">
    <header class="border-b border-slate-100">
      <nav class="mx-auto max-w-6xl px-4 py-4">
        <span class="text-lg font-bold tracking-tight">mediamundis</span>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-slate-100">
      <div class="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
        © mediamundis
      </div>
    </footer>
  </div>
</template>
