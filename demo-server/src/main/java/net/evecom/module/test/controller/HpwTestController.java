package net.evecom.module.test.controller;

import net.evecom.module.test.model.HpwTest;
import net.evecom.module.test.service.HpwTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/hpwTest")
public class HpwTestController {

    @Autowired
    private HpwTestService hpwTestService;

    @ResponseBody
    @RequestMapping("/insert")
    public int insert(HpwTest record) {
        return hpwTestService.insertTest(record);
    }
}
