import store from '@/store';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// echo nid this Pusher class
window.Pusher = Pusher;

export default function getEcho(option = null, customStore = null) {
  const { token } = customStore ? customStore.state.auth : store.state.auth;

  const defaultOption = {
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_APP_KEY,
    authEndpoint: `${process.env.VUE_APP_SERVER_BASE_URL}/broadcasting/auth`,
    wsHost: process.env.VUE_APP_PUSHER_APP_HOST,
    wsPort: process.env.VUE_APP_PUSHER_APP_PORT,
    forceTLS: process.env.VUE_APP_PUSHER_APP_FORCE_TLS === 'true' || process.env.VUE_APP_PUSHER_APP_FORCE_TLS === true,
    disableStats: process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'dev',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  };

  if (option !== null) {
    return new Echo({ ...defaultOption, ...option });
  }

  return new Echo(defaultOption);
}
