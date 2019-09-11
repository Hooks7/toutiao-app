<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"

    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="showUploadFile =true" >
      <div slot="default">
        <img
          width="30"
          height="30"
          src="http://toutiao.meiduo.site/Fp2XB3DG7Dsye6hAcpg9ZI_yzcpV"
          alt
        />
      </div>
       </van-cell>
      <van-cell title="昵称" is-link :value="userProfile.name" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" is-link  :value="userProfile.gender?'女':'男'"/>
      <van-cell title="生日" is-link  :value="userProfile.birthday"/>
    </van-cell-group>

    <!-- 弹出上传文件的组件 -->
    <upload-file v-model="showUploadFile"></upload-file>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UploadFile from './component/UploadFile'
export default {
  name: 'UserProfile',
  components: {
    UploadFile
  },
  data () {
    return {
      userProfile: {}, // 当前登录用户资料
      showUploadFile: false // 弹层设置

    }
  },
  methods: {
    // 获取当前登录的用户的资料
    async loadUserProfile () {
      try {
        const res = await getUserProfile()
        this.userProfile = res
      } catch (err) {
        this.$toast.fail('获取失败')
      }
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style>
</style>
