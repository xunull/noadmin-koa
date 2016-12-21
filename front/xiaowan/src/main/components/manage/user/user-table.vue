<template lang="html">
    <!-- 表格中并没有将全部信息都显示出来,显示的是主要信息，全部信息可以在每条记录的详细页面中查看 -->
    <div >
        <div class="inner-nav">
            <el-button-group class='start-button-group'>
              <el-button type="primary" >修改</el-button>
              <el-button @click='unLockUser' type="primary" >启用</el-button>
              <el-button @click='blockUser' type="danger" >禁用</el-button>
              <el-button @click='deleteUser' type="danger" >删除</el-button>
            </el-button-group>

            <el-button class='end-button-group'
                @click.native='toCreateUser' :plain="true" type="primary" >创建用户</el-button>

        </div>
        <el-row>
          <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <el-table
                     :data="userData"
                     :border='true'
                     :stripe='true'
                     selection-mode="multiple"
                     @selection-change='selectChange'
                     style="width: 100%">
                     <el-table-column
                       type="selection"
                       width="50">
                     </el-table-column>
                     <el-table-column
                       type="index"
                       width="50">
                     </el-table-column>
                     <el-table-column
                       property="login_name"
                       label="登录名"
                       width="180">
                     </el-table-column>
                     <el-table-column
                       property="login_name"
                       label="用户名"
                       width="180">
                     </el-table-column>
                     <el-table-column
                       property="active"
                       label="活跃帐户"
                       width="180">
                     </el-table-column>
                     <el-table-column
                       property="is_block"
                       label="是否禁用"
                       width="180">
                     </el-table-column>
                     <el-table-column
                       property="create_time"
                       label="创建时间">
                     </el-table-column>
                     <el-table-column
                       property="create_user"
                       label="创建者">
                     </el-table-column>
                   </el-table>
              </div>
          </el-col>
        </el-row>
    </div>
</template>

<script>
var selected_user=[]

export default {
    data() {
        var userData = [];
        this.$http.get('/admin/users').then(response => {

            if (response.body.ok) {
                for(let user of response.body.data) {
                  console.log(user.create_time)
                  let date = new Date(user.create_time)
                  // console.log(date.toLocaleDateString())
                  // console.log(date.toLocaleString())
                  // console.log(date.toLocaleTimeString())
                  user.create_time = date.toLocaleString()
                }
                userData.push(...response.body.data);
            }
        }, response => {

        });
        return {
            userData: userData
        }
    },
    computed: {},
    mounted() {},
    methods: {
        reloadTable(){
          this.$http.get('/admin/users').then(response => {

              if (response.body.ok) {
                  for(let user of response.body.data) {
                    console.log(user.create_time)
                    let date = new Date(user.create_time)
                    // console.log(date.toLocaleDateString())
                    // console.log(date.toLocaleString())
                    // console.log(date.toLocaleTimeString())
                    user.create_time = date.toLocaleString()
                  }

                  this.$data.userData=[]
                  this.$data.userData.push(...response.body.data)
              }
          }, response => {

          });
        },
        unLockUser() {
          if(!this.selected_user_isNull()) {
            this.$http.post('/admin/users/unlock',{
              users:selected_user
            }).then(response=>{
              if(response.body.ok) {
                this.$message.success({
                  duration:1000,
                  message:'操作成功'
                });
                this.reloadTable()
              } else {
                this.$message.error({
                  duration:1000,
                  message:response.body.error_msg
                });
              }
            },response=>{

            })
          }

        },
        selected_user_isNull(){
          if(0 === selected_user.length) {
            this.$message.error({
              duration:1000,
              message:'无目标用户'
            });
            return true
          } else {
            return false
          }
        },
        toCreateUser() {
            this.$router.push('/manage/user/userCreate');
        },
        selectChange(selection) {
            let tempArr = []
            for(let user of selection) {
                tempArr.push(user.id)
            }
            selected_user=tempArr
            console.log(selected_user)
        },
        blockUser() {
          if(!this.selected_user_isNull()) {
              this.$http.post('/admin/users/block',{
                users:selected_user
              }).then(response=>{
                if(response.body.ok) {
                  this.$message.success({
                    duration:1000,
                    message:'操作成功'
                  });
                  this.reloadTable()
                } else {
                  this.$message.error({
                    duration:1000,
                    message:response.body.error_msg
                  });
                }
              },response=>{

              })
          }

        },
        deleteUser() {
            if(0 === selected_user.length) {
              this.$message.error({
                duration:1000,
                message:'无目标用户'
              });
            } else {
              this.$http.post('/admin/users/delete',{
                users:selected_user
              }).then(response=>{
                  if(response.body.ok) {
                    this.$message.success({
                      duration:1000,
                      message:'操作成功'
                    });
                    this.reloadTable()
                  } else {
                    this.$message.error({
                      duration:1000,
                      message:response.body.error_msg
                    });
                  }
              },response=>{

              })
            }
        }
    },
    components: {}
}
</script>

<style lang="css">
    .start-button-group {
        margin-left: 10px;
    }
    .end-button-group {
        margin-right: 10px;
    }
    .inner-nav {
        height:50px;
        border:1px solid #e0e6ed;
        border-radius: 3px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

</style>
