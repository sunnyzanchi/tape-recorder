<style scoped>
  button {
    background: #1976d2;
    border: 0;
    border-radius: 50%;
    bottom: 16px;
    color: #fff;
    height: 64px;
    left: 50%;
    position: absolute;
    transform: translate(-50%);
    transition: .2s background-color;
    width: 64px;
  }
  button:hover{
    background: #1565c0;
    cursor: pointer;
  }
</style>
<template>
  <button @click="record">
    Record
  </button>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: mapState({
    buttonText: state => state.isRecording ? 'Record' : 'Recording',
  }),
  methods: mapActions(['record']),
};
</script>
