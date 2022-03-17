<template>
  <el-container style="height: 1000px; border: 1px solid #fff">
    <el-aside width="20%" style="height: 65%; background-color: rgb(255,255,255); display: flex">
      <div class="app-container">
        <div></div>
        <el-input v-model="filterText" placeholder="关键字过滤" style="margin-bottom:20px; width: 150px" />
        <el-button type="primary">主要按钮</el-button>
        <div class="custom-tree-container">
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span style="margin-left: 10px">
                <el-button
                  icon="el-icon-folder-add"
                  type="text"
                  size="mini"
                  @click="() => append(data)"
                />
                <el-button
                  class="el-icon-edit-outline"
                  type="text"
                  size="mini"
                  @click="() => rename(node, data)"
                />
                <el-button
                  class="el-icon-delete"
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                />
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </el-aside>

    <el-container>
      <el-header style="text-align: left; font-size: 12px; height: 40px">
        <div style="margin-top: 20px">
          <el-select v-model="value" filterable placeholder="项目" style="width: 120px" value="">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span style="margin-left: 10px;">
            <el-button type="primary" size="small" plain>API</el-button>
            <el-button type="primary" size="small" plain>CASE</el-button>
            <el-input
              v-model="input"
              style="width:300px; float:right; padding-right:50px"
              placeholder="根据ID/名称查询"
              clearable
            />
          </span>
        </div>
      </el-header>
      <el-main>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              prop="id"
              label="ID"
              width="100"
            />
            <el-table-column
              prop="name"
              label="接口名称"
              width="200"
            />
            <el-table-column
              prop="method"
              label="请求方法"
              width="120"
            />
            <el-table-column
              prop="path"
              label="路径"
              width="120"
            />
            <el-table-column
              prop="status"
              label="接口状态"
              width="120"
            />
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="120"
            />
            <el-table-column
              prop="updateTime"
              label="更新时间"
              width="120"
            />
            <el-table-column
              prop="aaaa"
              label="测试"
              width="120"
            />
            <el-table-column
              prop="bbb"
              label="测试2"
              width="120"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="200"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">
                  执行
                </el-button>
                <el-button type="text" size="small">
                  编辑
                </el-button>
                <el-button type="text" size="small">
                  用例
                </el-button>
                <el-button type="text" size="small">
                  删除
                </el-button>
                <el-button type="text" size="small">
                  复制
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  let id = 1000
  export default {
    data() {
      const item = {
        id: '1',
        name: '测试接口',
        method: 'post',
        path: '/wqewqeqdwdq/dqwdwweqwewqe',
        status: '进行中',
        createTime: '2021-09-25 11:31:31',
        updateTime: '2021-09-25 11:31:31'
      }
      return {
        filterText: '',
        data: [{
          id: 1,
          label: '默认',
          children: [{
            id: 4,
            label: '二级子模块1',
            children: [{
              id: 9,
              label: '三级子模块1'
            }, {
              id: 10,
              label: '三级子模块2'
            }]
          }]
        }, {
          id: 2,
          label: '一级子模块2',
          children: [{
            id: 5,
            label: '二级子模块 1'
          }, {
            id: 6,
            label: '二级子模块 2'
          }]
        }, {
          id: 3,
          label: '一级子模块3',
          children: [{
            id: 7,
            label: '二级子模块 1'
          }, {
            id: 8,
            label: '二级子模块 2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: Array(5).fill(item),
        options: [{
          value: '选项1',
          label: '默认项目'
        }, {
          value: '选项2',
          label: '测试项目'
        }],
        value: '',
        input: ''
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },
      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      }
    }
  }
</script>

<style>
  .el-aside {
    color: #333;
    border-right-style: solid;
    border-color: #f4f4f5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
