import { createApp } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './style.css';
import App from './App.vue';
import router from './router';
import injector from './service.config';

const app = createApp(App);

app.use(BootstrapVue3);
app.use(BootstrapIconsPlugin);
app.use(injector);
app.use(router);

app.mount('#app');
