<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="dialogVisibleClick" width="40%">
    <el-form :model="form" ref="form">
      <el-form-item label="课程号" required>
        <el-input v-model="form.cno" autocomplete="off" :disabled="cnoVisible" placeholder="请输入课程号"></el-input>
      </el-form-item>
      <el-form-item label="课程名" required>
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入课程名" clearable="clearable"></el-input>
      </el-form-item>
      <el-form-item label="学分" required>
        <el-input-number v-model="form.credit" autocomplete="off" controls-position="right" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="先修课课程号">
        <el-input placeholder="请输入先修课课程号" v-model="form.cpno" clearable="clearable" @change="searchList(form.cpno)">
          <el-button slot="append" icon="el-icon-search" @click="searchList(form.cpno)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="先修课">
        <el-input v-model="course" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="教师编号" required>
        <el-input placeholder="请输入教师编号" v-model="form.tno" clearable="clearable" @change="teacherSearch(form.tno)">
          <el-button slot="append" icon="el-icon-search" @click="teacherSearch(form.tno)"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="教师" required>
        <el-input v-model="teacher" autocomplete="off" clearable="clearable" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="容量" required>
        <el-input-number v-model="form.capacity" autocomplete="off" controls-position="right" :min="1" :max="300"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleClick">取 消</el-button>
      <el-button type="primary" @click="submitProfile">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ZstuDialog',
  data() {
    return {

    }
  },
  computed: {
    
  },
  props: {
    cnoVisible: {
      type: Boolean,
      default: true
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '信息'
    },
    form: {
      type: Object, 
      default() {
        return {
          credit: 1,
          capacity: 10
        }
      }
    },
    course: {
      type: String,
      default: '无'
    },
    teacher: {
      type: String,
      default: '无'
    }
  },
  methods: {
    searchList(cpno) {
      this.$emit('searchList', cpno)
    },
    teacherSearch(tno) {
      this.$emit('teacherSearch', tno)
    },
    submitProfile() {
      if(this.form.name === '' || this.form.cno === '' || this.form.tno === '' || this.teacher === '无') {
        return
      }
      this.$emit('editDialog', this.form)
      
    },
    dialogVisibleClick() {
      this.$emit('dialogVisibleClick')
    }
  }
}
</script>

<style scoped>

</style>
