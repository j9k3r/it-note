<script setup lang="ts">
// import Versions from '@/components/test/Versions.vue'
</script>

<template>
  <button @click="() => { throw new Error('test err in Electron.vue') }" style="height: 30px">СОздать ошибку</button>
<!--    <Versions></Versions>-->
  <svg class="hero-logo" viewBox="0 0 900 300">
    <use xlink:href="../../assets/icons.svg#electron" />
  </svg>
  <h2 class="hero-text">You've successfully created an Electron project with Vue and TypeScript</h2>
  <p class="hero-tagline">Please try pressing <code>F12</code> to open the devTool</p>
  <p>
    <nav>
      <ul>
        <li><router-link :to="{'name':'test', params: {test: 'Hello world' }}">test page</router-link></li>
        <li><router-link :to="{'name':'noteEdit', params: {noteId: '1' }}">Note edit id 1</router-link></li>
        <li><router-link :to="{'name':'noteCreate'}">Note create</router-link></li>
        <li><router-link :to="{'name':'noteList'}">Note List</router-link></li>
      </ul>
    </nav>
  </p>

  <div class="links">
    <div class="link-item">
      <a target="_blank" href="https://electron-vite.org">Documentation</a>
    </div>
    <div class="link-item link-dot">•</div>
    <div class="link-item">
      <a target="_blank" href="https://github.com/alex8088/electron-vite">Getting Help</a>
    </div>
    <div class="link-item link-dot">•</div>
    <div class="link-item">
      <a
        target="_blank"
        href="https://github.com/alex8088/quick-start/tree/master/packages/create-electron"
      >
        create-electron
      </a>
    </div>
  </div>

  <div class="features">
    <div class="feature-item">
      <article>
        <h2 class="title">Configuring</h2>
        <p class="detail">
          Config with <span>electron.vite.config.ts</span> and refer to the
          <a target="_blank" href="https://electron-vite.org/config">config guide</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">HMR</h2>
        <p class="detail">
          Edit <span>src/renderer</span> files to test HMR. See
          <a target="_blank" href="https://electron-vite.org/guide/hmr.html">docs</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Hot Reloading</h2>
        <p class="detail">
          Run <span>'electron-vite dev --watch'</span> to enable. See
          <a target="_blank" href="https://electron-vite.org/guide/hot-reloading.html">docs</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Debugging</h2>
        <p class="detail">
          Check out <span>.vscode/launch.json</span>. See
          <a target="_blank" href="https://electron-vite.org/guide/debugging.html">docs</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Source Code Protection</h2>
        <p class="detail">
          Supported via built-in plugin <span>bytecodePlugin</span>. See
          <a target="_blank" href="https://electron-vite.org/guide/source-code-protection.html">
            docs
          </a>
          .
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Packaging</h2>
        <p class="detail">
          Use
          <a target="_blank" href="https://www.electron.build">electron-builder</a>
          and pre-configured to pack your app.
        </p>
      </article>
    </div>
  </div>
</template>

<style lang="less">
@import '@/assets/css/styles.less';
//@import '../../assets/css/styles.less';
</style>
