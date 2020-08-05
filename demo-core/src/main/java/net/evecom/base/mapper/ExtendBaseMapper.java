package net.evecom.base.mapper;

import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @description 扩展基础Mapper类
 *
 * @author Pellym Huang
 * @created 2020/3/23 15:50
 */
public interface ExtendBaseMapper<T> extends IService {
    /*@SelectProvider(type = BaseDaoProvider.class, method = "findByColumn")
    public T findByColumn();

    class BaseDaoProvider<T> {
        public T findByColumn() {

            return null;
        }
    }*/
}
