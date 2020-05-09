这是一个移动端个性签名组件

<autograph
      ref="autograph"
      :disabled="disabled"
      :role-name="roleName"
      :user-name="userName"
      v-model="isShowSignAutograph"
      @onComposeAutograph="onComposeAutograph" />
