<template lang="html">
    <!-- 表格中并没有将全部信息都显示出来,显示的是主要信息，全部信息可以在每条记录的详细页面中查看 -->
    <!-- -->
    <div >

        <el-tree class='tree-div'
          :data="treeData"
          :props="props"
          :load="loadNode"
          :highlight-current='true'
          lazy
          @node-click='nodeClick'
          >
        </el-tree>
    </div>
</template>

<script>
var selected_user=[]

export default {
    data() {
        var treeData = [];

        return {
            treeData: treeData,
            props: {
                label: 'name',
                children:'children_menu'
            }
        }
    },
    computed: {},
    mounted() {},
    methods: {
        nodeClick(obj,nodeObj,nodeArr){
            this.$emit('nodeclick',obj)
        },
        loadNode(node, resolve) {

            this.$http.get('/admin/menus/rolemenus',{
                params:{
                    role_id:1,
                    pid:node.data.id
                }
            }).then(response => {
                if (response.body.ok) {
                    console.log(response.body.data);
                    resolve(response.body.data)
                }
            }, response => {

            });
        },
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
