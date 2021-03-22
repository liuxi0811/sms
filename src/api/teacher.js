import request from '@/utils/request'

export default {
    // 获取教师列表
    getList(){
        return request({
            url:'teacher/list',
            method:'get'
        })
    },
    // 分页查询
    search(page,size,searchMap){
        return request({
            url:'teacher/list',
            method:'post',
            data:{
                page,
                size,
                searchMap
            }
        })
    },
    // 新增教师
    add(pojo){
        return request({
            url:'/teacher',
            method:'post',
            data:pojo
        })
    },
    // 根据id查询教师
    getById(id){
        return request({
            url:`/teacher?id=${id}`,
            method:'get'
        })
    },
    // 修改教师信息
    update(pojo){
        return request({
            url:`/teacher`,
            method:'put',
            data:pojo
        })
    },
    // 删除教师
    deleteById(id) {
        return request({
        url: `/teacher`, // 反单引号 ``
        method: 'delete', // delete 方式提交
        data:{
            id
        }
        })
    }

}