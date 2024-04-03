import TextInput from 'ipretty/components/TextInput'
import TitleRequired from 'ipretty/components/TitleRequired'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Skeleton from 'ipretty/components/Skeleton'
import {
  Box,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormGroup,
  Checkbox
} from "@material-ui/core";
import FieldsUpdate from './FieldsUpdate'

const General = React.memo((props) => {
    const { classes, getTranslation, user, departments, setUser, isEdit, errors } = props

    const onChange = nameField => (e) => {

        if (nameField === 'role') {
            let userRole = e.target.value;
            let role = [...user.role];
            
            if (role.indexOf(userRole) == -1) {
                role.push(userRole);

            } else {
                role.splice(role.indexOf(userRole), 1);

            }
                setUser({ ...user, role: role });

        }else {
            setUser({ ...user, [nameField]: e.target.value });
        }
    }
    
    return (
      <Box className={classes.boxForm} width={1} my={4} px={3} py={2}>
        <div className={classes.title}>
          {getTranslation("generalInformation")}
        </div>
        <div className={classes.lessonItem}>
          <div className={classes.lessonTitle}>
            <TitleRequired title={getTranslation("UserName")} required={true} />
          </div>
          <div className={classes.textInput}>
            <TextInput
              placeholder={getTranslation("PlaceholderUserName")}
              onChange={onChange("name")}
              fullWidth
              value={user.name || ""}
              noMargin
              helperText={errors["name"]}
            />
          </div>
        </div>

        <div className={classes.lessonItem}>
          <div className={classes.lessonTitle}>
            <TitleRequired title={getTranslation("Email")} required={true} />
          </div>
          <div className={classes.textInput}>
            <TextInput
              placeholder={getTranslation("PlaceholderEmail")}
              onChange={onChange("email")}
              fullWidth
              value={user.email || ""}
              noMargin
              helperText={errors["email"]}
            />
          </div>
        </div>

        {user.menuroles != "admin" && (
          <div className={classes.lessonItem}>
            <div className={classes.lessonTitle}>
              <TitleRequired
                title={getTranslation("Department")}
                required={true}
              />
            </div>
            <div className={classes.textInput}>
              {departments && departments.length > 0 ? (
                <TextInput
                  select
                  options={departments}
                  onChange={onChange("department_id")}
                  fullWidth
                  value={user.department_id || ""}
                  noMargin
                />
              ) : (
                <Skeleton type="text" />
              )}
            </div>
          </div>
        )}

        {user.department_id && user.department_id == 1 ? (
          <div className={classes.lessonItem}>
            <div className={classes.lessonTitle}>
              <TitleRequired title={getTranslation("Role")} required={true} />
            </div>
            <div className={classes.textInput}>
              <FormControl component="fieldset">
                <FormGroup
                //   aria-label="gender"
                //   name="gender1"
                //   value={user.role || user.menuroles}
                //   onChange={onChange("role")}
                >
                  <FormControlLabel
                    value="employee"
                    control={<Checkbox />}
                    label={getTranslation("InnerStudent")}
                    onChange={onChange("role")}
                  />
                  <FormControlLabel
                    value="teacher"
                    control={<Checkbox />}
                    label={getTranslation("Teacher")}
                    onChange={onChange("role")}
                  />
                </FormGroup>
              </FormControl>
            </div>
          </div>
        ) : (
          <div className={classes.lessonItem}>
            <div className={classes.lessonTitle}>
              <TitleRequired title={getTranslation("Role")} required={true} />
            </div>
            <div className={classes.textInput}>
              <FormControl component="fieldset">
                <FormGroup
                //   aria-label="gender"
                //   name="gender1"
                //   value={user.role || user.menuroles}
                //   onChange={onChange("role")}
                >
                  <FormControlLabel
                    value="user"
                    control={<Checkbox />}
                    label={getTranslation("FreeStudent")}
                    onChange={onChange("role")}
                  />
                  <FormControlLabel
                    value="employee"
                    control={<Checkbox />}
                    label={getTranslation("InnerStudent")}
                    onChange={onChange("role")}
                  />
                </FormGroup>
              </FormControl>
            </div>
          </div>
        )}

        {isEdit && (
          <FieldsUpdate
            classes={classes}
            getTranslation={getTranslation}
            user={user}
            onChange={onChange}
          />
        )}
      </Box>
    );
})

export default General