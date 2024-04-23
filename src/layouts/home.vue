<template>
  <main
    h-700px max-w-6xl w-full overflow-hidden shadow-gray-200 shadow-lg
    text="center gray-700 dark:gray-200"
    flex="~"
    position="fixed top-1/2 left-1/2"
    border="~ border-gray-50 rounded-xl"
    class="-translate-x-1/2 -translate-y-1/2"
  >
    <Sidebar />
    <div flex="1" w-0 p-4>
      <Navbar />
      <RouterView />
    </div>
  </main>
</template>
