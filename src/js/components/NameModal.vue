<style scoped>
   button {
     align-self: flex-end;
     background: #fff;
     border: 0;
     color: #1976d2;
     font-size: .68em;
     font-weight: 500;
     padding: 12px;
     text-transform: uppercase;
     transition: .2s background-color, .2s color;
   }
   button:disabled {
     color: #ccc;
   }
   button:disabled:hover {
     background: #fff;
     cursor: default;
   }
   button:hover {
     background: #eee;
     cursor: pointer;
   }
   h1 {
     font-size: 1em;
     margin-bottom: 18px;
   }
   input {
     border: 0;
     border-bottom: 1px solid #ccc;
     font-weight: 300;
     margin: 0 0 18px;
     transition: .2s border-bottom;
     width: 90%;
   }
   input:focus {
     border-bottom: 1px solid #42a5f5;
   }
   button, input {
     font-family: 'Roboto', sans-serif;
   }
  .modal {
    align-items: flex-start;
    background: #fff;
    box-shadow:
      0 14px 28px rgba(0,0,0,0.25),
      0 10px 10px rgba(0,0,0,0.22);
    display: flex;
    flex-direction: column;
    font-size: 18px;
    margin: auto;
    padding: 24px 12px 12px 24px;
    width: 80%;
  }
  .overlay {
    background: rgba(0,0,0,.4);
    bottom: 0;
    display: flex;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
<template>
  <div class="overlay">
    <div class="modal">
      <h1>Name Track</h1>
      <input
        @keyup.enter="save"
        type="text"
        v-focus
        v-model="name"
      >
      <button
        @click="save"
        :disabled="!name"
      >
        Save
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  computed: mapState(['currentlyAddingTrack']),
  data() {
    return {
      name: '',
    };
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    ...mapActions(['addTrack']),
    ...mapMutations(['hideTrackNamePrompt']),
    async save() {
      if (!this.name) {
        return;
      }
      const track = {
        ...this.currentlyAddingTrack,
        name: this.name,
      };
      await this.addTrack(track);
      this.hideTrackNamePrompt();
    },
  },
};
</script>
