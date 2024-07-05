import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { DEP_DATA } from "../constant/department";

const Department = () => {
  const [expanded, setExpanded] = useState(Array(DEP_DATA.length).fill(true));

  //state check status
  const [checkStatus, setCheckStatus] = useState(
    DEP_DATA.map((item) => ({
      department: false,
      subDepartment: Array(item.sub_departments.length).fill(false),
    }))
  );

  const handleDeptChecked = (dept: number) => {
    setCheckStatus((prev) => {
      const newChecked = [...prev];
      const isDepChecked = !newChecked[dept].department;
      newChecked[dept] = {
        department: isDepChecked,
        subDepartment: newChecked[dept].subDepartment.map(() => isDepChecked),
      };
      return newChecked;
    });
  };

  const handleSubDepChecked = (dept: number, subDep: number) => {
    setCheckStatus((prev) => {
      const newChecked = [...prev];
      newChecked[dept].subDepartment[subDep] =
        !newChecked[dept].subDepartment[subDep];

      const allSubChecked = newChecked[dept].subDepartment.every(
        (checkStatus) => checkStatus
      );
      newChecked[dept].department = allSubChecked;
      return newChecked;
    });
  };

  const handleExpanded = (index: number) => {
    setExpanded((prevData) => ({
      ...prevData,
      [index]: !prevData[index],
    }));
  };
  return (
    <div>
      {DEP_DATA.map((item, index) => (
        <Box key={index}>
          <Button onClick={() => handleExpanded(index)}>
            {expanded[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
          <FormControlLabel
            label={item.department}
            control={
              <Checkbox
                checked={checkStatus[index].department}
                onChange={() => handleDeptChecked(index)}
              />
            }
          />
          <Collapse in={expanded[index]}>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 12 }}>
              {item.sub_departments.map((subDep, idx) => (
                <FormControlLabel
                  label={subDep}
                  key={idx}
                  control={
                    <Checkbox
                      checked={checkStatus[index].subDepartment[idx]}
                      onChange={() => handleSubDepChecked(index, idx)}
                    />
                  }
                />
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </div>
  );
};

export default Department;
