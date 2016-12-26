<template lang="html">
	<div >
        <el-row>
          <el-col :span="12">
                选择父级菜单,选择为空表示一级菜单
                <menu-tree
                v-on:nodeclick="nodeClick"
                >
                </menu-tree>
          </el-col>
          <el-col :span="12">
              <el-form ref="form" label-width="80px" @submit.prevent="onSubmit">
                <el-form-item label="菜单名称">
                  <el-input v-model='name'></el-input>
                </el-form-item>
                <el-form-item label="路径">
                  <el-input v-model='uri'></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click.native='saveMenu' type="primary">立即创建</el-button>
                  <el-button @click.native.back='back'>取消</el-button>
                </el-form-item>
              </el-form>
          </el-col>
        </el-row>
	</div>
</template>

<script>
import MenuTree from './menu-tree.vue'

export default {
    data(){

        return {
            name: null,
            uri: null
        }
    },
    methods:{
        saveMenu: function() {
            this.$http.post('/admin/menus/create',{
                name:this.$data.name,
                uri:this.$data.uri,
            }).then(response=>{
                console.log(response.body)
            },response=>{
               console.log(response.body)
            })

            console.log(this.$data);

        },
        back: function() {
            this.$router.push('/manage/menu/menuTree')
        },
        nodeClick:function(obj) {
            console.log(obj)
        }
    },
    components:{
        MenuTree
    }
}
</script>

<style lang="css">
</style>
