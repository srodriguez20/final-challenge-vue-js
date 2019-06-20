<template>
  <div class="autocomplete">
    <input
      class="input-field"
      type="text"
      v-model="search"
      autocomplete="off"
      :placeholder="placeholder"
      :id="id"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter.prevent="onEnter"
    >
    <ul id="autocomplete-list" v-if="open" class="autocomplete-list">
      <li
        v-for="(obj, i) in list"
        :key="i"
        @click="setResult(obj)"
        class="autocomplete-obj"
        :class=" i === arrowCounter? 'active':'' "
      >{{ obj[field] }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    items: Array,
    field: String,
    placeholder: String,
    id: String
  },
  watch: {
    value() {
      this.search = this.value;
    }
  },

  data() {
    return {
      open: false,
      list: this.items,
      search: this.value,
      selected: "",
      isLoading: false,
      arrowCounter: 0
    };
  },

  methods: {
    onChange() {
      this.$emit("input", this.search);
      this.filterList();
      this.open = true;
    },

    filterList() {
      this.list = this.items.filter(item => {
        return (
          item[this.field].toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
    setResult(result) {
      this.$emit("itemSelected", result);
      this.search = result[this.field];
      this.open = false;
    },
    onArrowDown(evt) {
      if (this.arrowCounter < this.list.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      if (this.list[this.arrowCounter]) {
        this.$emit("itemSelected", this.list[this.arrowCounter]);
        this.search = this.list[this.arrowCounter][this.field];
      }

      this.open = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.open = false;
        this.arrowCounter = -1;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>



<style lang="scss" scoped>
.autocomplete {
  position: relative;
}

.autocomplete-list {
  padding: 0;
  margin: 0;
  border-radius: 5px;
  border: 1px solid #e9e9e9;
  min-height: 120px;
  overflow: auto;
  width: 100%;
}

.autocomplete-obj {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
  &.active,
  &:hover {
    background-color: #4d8ee2;
    color: white;
  }
}

.input-field {
  &.spaced {
    margin: 8px 0;
  }
  label,
  input {
    display: block;
  }
  label {
    font-weight: 600;
  }
  input {
    width: 100%;
    border-radius: 5px;
    padding: 5px 5px;
    border: 1px solid #000034;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  }
}
</style>