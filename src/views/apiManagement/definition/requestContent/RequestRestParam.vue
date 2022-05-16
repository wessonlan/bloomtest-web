<template>
  <!--动态增删表单-->
  <el-form label-width="100px" class="demo-dynamic">
    <!--请求头动态部分-->
    <el-form-item
      v-for="(domain) in restKeyValues"
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
  name: 'RequestRestParam',
  data() {
    return {
    }
  },
  computed: {
    restKeyValues: {
      get() {
        return this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.restKeyValue
      },
      set(restKeyValue) {
        this.$store.state.apiDefinition.saveApiRequest.reqParamInfo.restKeyValue = restKeyValue
      }
    }
  },
  watch: {
    dynamicForm: {
      // 把表单里的数据发送给父组件
      handler(newData) {
        this.restKeyValues = newData.domains
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addDomain() {
      this.restKeyValues.push({
        name: '',
        value: '',
        describe: ''
      })
    },
    removeDomain(item) {
      const index = this.restKeyValues.indexOf(item)
      if (index !== -1 && index !== 0) {
        this.restKeyValues.splice(index, 1)
      }
    }
  }
}
</script>
