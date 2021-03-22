import request from '@/utils/request'

export default {
    // 分页查询
    search(page,size,searchMap){
        console.log(searchMap);
        return request({
            url:'students/list',
            method:'post',
            data:{
                page,
                size,
                searchMap
            }
        })
    },
    // 新增
    add(pojo){
        return request({
            url:'/students',
            method:'post',
            data:pojo
        })
    },
    // 根据id查询学员
    getById(id){
        return request({
            url:`/students?id=${id}`,
            method:'get'
        })
    },
    // 修改学员信息
    update(pojo){
        return request({
            url:`/students`,
            method:'put',
            data:pojo
        })
    },
    // 删除学员
    deleteById(id) {
        return request({
        url: `/students`, // 反单引号 ``
        method: 'delete', // delete 方式提交
        data:{
            id
        }
        })
    }
}