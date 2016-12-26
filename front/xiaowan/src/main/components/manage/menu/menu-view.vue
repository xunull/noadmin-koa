<template lang="html">
    <div>
        <div class="inner-nav">

            <el-select v-model="value" filterable placeholder="请选择角色">
                <el-option

                    v-for="item in roles"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-button class='end-button-group'
                @click.native='toCreateMenu' :plain="true" type="primary" >创建菜单</el-button>

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
            roles
        }
    },
    methods:{
        toCreateMenu(){
            this.$router.push('/manage/menu/menuCreate');
        }
    }
}
</script>

<style lang="css">
</style>
