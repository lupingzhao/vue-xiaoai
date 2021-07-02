<template>
  <div class="">
    <!-- 标签页 -->
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- :label="data_sum" -->

        <el-tab-pane :label="data_sum" name="first">
          <el-table :data="data" style="width: 100%" :show-header="false">
            <el-table-column width="750">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template slot-scope="scope">
                {{ scope.row.time }}
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row, data, 0)"
                  >已读</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="btn">
            <el-button type="primary" @click="readAll">全部已读</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="data1_sum">
          <el-table :data="data1" style="width: 100%" :show-header="false">
            <el-table-column width="750">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template slot-scope="scope">
                {{ scope.row.time }}
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row, data1, 1)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="btn">
            <el-button type="primary" @click="delAll">全部删除</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="data2_sum">
          <el-table :data="data2" style="width: 100%" :show-header="false">
            <el-table-column width="750">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template slot-scope="scope">
                {{ scope.row.time }}
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  plain
                  @click="handleEdit(scope.$index, scope.row, data2, 2)"
                  >还原</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="btn">
            <el-button type="primary" @click="delNull">清空回收站</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      activeName: "first",

      data: [
        {
          title: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护1",
          isSlected: false,
          time: "2018-04-19 20:00:00",
        },
        {
          title: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护2",
          time: "2018-04-19 20:00:00",
        },
        {
          title: "今晚12点整发大红包,先到先得",
          time: "2018-04-19 20:00:00",
        },
      ],
      data1: [
        {
          title: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护3",
          time: "2018-04-19 20:00:00",
        },
      ],
      data2: [
        {
          title: "[系统通知]您的优惠券已经过期",
          time: "2018-04-19 20:00:00",
        },
      ],
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    // 单个点击事件
    handleEdit(index, row, a, b) {
      // console.log(index, row);
      // a是整个当前数组;
      // console.log(a);
      a.splice(index, 1);
      if (b === 0) {
        this.data1.push(row);
      } else if (b === 1) {
        this.data2.push(row);
      } else {
        // 点击还原就给已读数组添加
        this.data1.push(row);
      }
    },
    // 全部已读
    readAll() {
      // array.concat(array2) 数组拼接
      this.data1 = this.data1.concat(this.data);
      this.data = [];
    },
    // 删除全部已读
    delAll() {
      this.data2 = this.data2.concat(this.data1);
      this.data1 = [];
    },
    // 全部清空
    delNull() {
      this.data2 = [];
    },
  },
  mounted() {},
  computed: {
    data_sum() {
      return `未读消息（${this.data.length}）`;
    },
    data1_sum() {
      return `未读消息（${this.data1.length}）`;
    },
    data2_sum() {
      return `未读消息（${this.data2.length}）`;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.btn {
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid rgb(212, 212, 212);
}
</style>