package net.evecom.module.test.mapper;

import net.evecom.module.test.model.HpwTest;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HpwTestMapper {
    int insert(HpwTest record);

    int insertSelective(HpwTest record);
}