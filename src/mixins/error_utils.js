export default {
  methods: {
    handleError(error, defaultErrorKey, formRef = 'form') {
      if (error.isValidationError) {
        this.$refs[formRef].setErrors(error);
      } else {
        this.$refs[formRef].setErrors({
          [defaultErrorKey]: error.response?.data?.message ?? error.message ?? 'something went wrong',
        });
      }
    },
  },
};
