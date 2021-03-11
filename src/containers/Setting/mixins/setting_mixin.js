import { UPDATE_SETTING } from '@/store/modules/setting';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { ServerUtils } from '@/mixins';

export default {
  mixins: [ServerUtils],
  computed: {
    ...mapGetters('setting', ['isMarketplaceConnected', 'findSettingByIdentifierAndCollection']),
    isConnected() {
      return this.isMarketplaceConnected(this.identifier);
    },
  },
  methods: {
    ...mapMutations('setting', [UPDATE_SETTING]),
    ...mapActions('setting', ['updateSetting']),
    getSettings(collection) {
      return this.findSettingByIdentifierAndCollection(this.identifier, collection);
    },
    updateForm(key, value, collection) {
      this[UPDATE_SETTING]({
        identifier: this.identifier,
        collection,
        key,
        value,
      });
    },

    async onSaveClick() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;

      try {
        await this.updateSetting(this.identifier);
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
