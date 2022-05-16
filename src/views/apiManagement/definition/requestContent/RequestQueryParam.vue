<template>
  <!--动态增删表单-->
  <el-form label-width="100px" class="demo-dynamic">
    <!--请求头动态部分-->
    <el-form-item
      v-for="(domain) in paramKeyValues"
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
  name: 'RequestQueryParam',
  data() {
    return {
      dynamicForm: {
        domains: [
          {
            name: '',
            value: '',
            describe: ''
          }
        ]
      }
    }
  },
  computed: {
    paramKeyValues: {
      get() {
        return this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.paramKeyValue
      },
      set(paramKeyValues) {
        this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.paramKeyValue = paramKeyValues
      }
    }
  },
  watch: {
    dynamicForm: {
      handler(newData) {
        this.paramKeyValues = newData.domains
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addDomain() {
      this.paramKeyValues.push({
        name: '',
        value: '',
        describe: ''
      })
    },
    removeDomain(item) {
      const index = this.paramKeyValues.indexOf(item)
      if (index !== -1 && index !== 0) {
        this.paramKeyValues.splice(index, 1)
      }
    }
  }
}
</script>
