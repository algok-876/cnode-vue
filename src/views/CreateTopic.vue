<template>
  <div class="create-topic">
    <el-row>
      <el-card>
        <div slot="header">
          发布主题
        </div>
        <div class="edit-area">
          <el-form
            :model="createForm"
            :rules="rules"
            ref="form"
            label-position="top"
          >
            <el-form-item label="选择板块" prop="tab">
              <el-select v-model="createForm.tab" placeholder="请选择">
                <el-option
                  v-for="item in tabOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主题标题" prop="title" label-width="180">
              <el-input v-model="createForm.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item prop="content">
              <mavon-editor v-model="createForm.content" class="editor"/>
            </el-form-item>
            <el-button type="primary" @click="onSubmit" class="publish-btn">发布</el-button>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      createForm: {
        tab: '',
        title: '',
        content: ''
      },
      tabOptions: [
        {
          value: 'share',
          label: '分享'
        },
        {
          value: 'ask',
          label: '回答'
        },
        {
          value: 'job',
          label: '招聘'
        },
        {
          value: 'dev',
          label: '客户端测试'
        }
      ],
      rules: {
        tab: [{ required: true, message: '请选择发布板块', trigger: 'blur' }],
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit () {
      if (!this.accesstoken) {
        this.$msg({
          type: 'warning',
          message: '您还没有登录，登录后才可以发布主题'
        })
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitCreateForm()
        }
      })
    },
    async submitCreateForm () {
      const options = { ...this.createForm, accesstoken: this.accesstoken }
      let res = null
      try {
        res = await this.$api.topic.createTopic(options)
      } catch (e) {
        this.$msg({
          type: 'error',
          message: e.response.data.error_msg
        })
      }
      if (res.success) {
        this.$router.push({ name: 'Topic', params: { id: res.topic_id } })
      }
    }
  },
  computed: mapState(['accesstoken', 'loginStatus'])
}
</script>

<style lang="scss" scoped>
.create-topic{
  padding: 25px;
  .right{
    padding-left: 25px;
    @media (max-width: 768px) {
      padding-left: 0;
      margin-top: 25px;
    }
  }
  .editor{
    min-height: 450px;
  }
  .publish-btn{
    margin-top: 25px;
  }
}
</style>