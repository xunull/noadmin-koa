<template lang="html">
    <div>
        <div class="inner-nav">

            <el-select v-model="role_id" filterable placeholder="请选择角色">
                <el-option

                    v-for="item in roles"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <div>
                <el-button class='end-button-group'
                    @click.native='toRoleMenu' :plain="true" type="primary" >角色菜单设置</el-button>
                <el-button class='end-button-group'
                    @click.native='toCreateMenu' :plain="true" type="primary" >创建菜单</el-button>
            </div>

        </div>
        <router-view></router-view>
    </div>

</template>

<script>
export default {
    data() {
        let roles=[]
        this.$http.get('/admin/roles/allroles').then(response => {
            if (response.body.ok) {
                console.log(response.body.data);
                roles.push(...response.body.data)
            }
        }, response => {

        });
        return {
            roles,
            role_id:null
        }
    },
    methods:{
        toCreateMenu(){
            this.$router.push('/manage/menu/menuCreate');
        },
        toRoleMenu(){
            this.$router.push('/manage/menu/roleMenu/'+this.$data.role_id)
        }
    }
}
</script>

<style lang="css">
</style>
