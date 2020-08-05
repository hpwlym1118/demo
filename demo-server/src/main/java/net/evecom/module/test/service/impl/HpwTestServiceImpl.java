package net.evecom.module.test.service.impl;

import net.evecom.module.test.mapper.HpwTestMapper;
import net.evecom.module.test.model.HpwTest;
import net.evecom.module.test.service.HpwTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HpwTestServiceImpl implements HpwTestService {

    @Autowired
    private HpwTestMapper hpwTestMapper;

    @Override
    public int insertTest(HpwTest record) {
        return hpwTestMapper.insertSelective(record);
    }
}
