import getEcho from '@/utils/echo';

export default {
  data: () => ({
    echoInstance: null,
    echoChannel: null,
  }),
  mounted() {
    this.echoInstance = getEcho();

    const { shopId } = this.$route.params;

    this.echoChannel = this.echoInstance.private(`App.Shop.${shopId}`);
  },
  methods: {
    listenToNotification(notificationNamespace, onNotification) {
      this.echoChannel.notification((notification) => {
        if (!notification.type.startsWith(notificationNamespace)) {
          return;
        }

        console.log('notification received');

        // call onNotification callback
        onNotification(notification);
      });
    },
  },
  beforeDestroy() {
    if (this.echoChannel) {
      const { shopId } = this.$route.params;

      this.echoInstance.leave(`App.Shop.${shopId}`);

      this.echoInstance = null;
      this.echoChannel = null;
    }
  },
};
