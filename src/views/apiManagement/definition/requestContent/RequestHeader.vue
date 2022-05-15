<template>
  <!--动态增删表单-->
  <el-form label-width="100px" class="demo-dynamic">
    <!--请求头动态部分-->
    <el-form-item
      v-for="(domain) in headerInfo"
      :key="domain.key"
    >
      <span style="margin-left: -100px; margin-top: -200px">
        <el-input v-model="domain.name" style="width: 200px" placeholder="键" />
        <el-input v-model="domain.value" style="width: 200px; margin-left: 5px" placeholder="值" />
        <el-input v-model="domain.describe" style="width: 200px; margin-left: 5px" placeholder="描述" />
        <el-button size="mini" style="margin-left: 5px" icon="el-icon-plus" @click="addDomain" />
        <el-button size="mini" icon="el-icon-minus" @click.prevent="removeDomain(domain)" />
      </span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'RequestHeader',
  data() {
    return {
    }
  },
  computed: {
    headerInfo: {
      get() {
        return this.$store.state.apiDefinition.saveApiRequest.headersKeyValue
      },
      set(value) {
        this.$store.state.apiDefinition.saveApiRequest.headersKeyValue = value
      }
    }
  },
  watch: {
    dynamicForm: {
      handler(newData) {
        this.headerInfo = newData.domains
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addDomain() {
      this.headerInfo.push({
        name: '',
        value: '',
        describe: ''
      })
    },
    removeDomain(item) {
      const index = this.headerInfo.indexOf(item)
      if (index !== -1 && index !== 0) {
        this.headerInfo.splice(index, 1)
      }
    }
  }
}
</script>
