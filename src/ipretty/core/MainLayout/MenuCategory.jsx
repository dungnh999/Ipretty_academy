import React, {useEffect, useState} from 'react';
import {Cascader, Popover, Typography} from "antd";
import CourseCategoriesService from "ipretty/services/CourseCategoriesService";
import MyCoursesService from "ipretty/services/MyCoursesService";
import {getMenuData} from "@ant-design/pro-components";
import useNavigator from "ipretty/hook/useNavigator";
const {Title} = Typography;

const MenuCategory = (props) => {
    const [dataMenu, setDataMenu] = useState([])
    const navigate = useNavigator();

    useEffect(() => {
        getDataMenuCategory();
    }, []);

    function getDataMenuCategory(){
        CourseCategoriesService.getMenuCategory('',
            (responses) => handleSuccess(responses), (errors) => handleError(errors))
    }

    const handleSuccess = (responses) => {
        if(responses && responses.data && responses.data.data) {
            console.log(responses.data.data)
           setDataMenu(responses.data.data)
        }
    };

    const handleError = (response) => {

    }

    const onChange =  (value, selectedOptions) => {
        const filteredArray = value.filter(item => item !== '');
        const string = filteredArray.join('/');
        navigate('/' + string);
    }

    return (
        <Popover
            placement="bottomLeft"
            arrow={false}
            style={{
                marginTop: '10px',
                padding: 0
            }}
            content={
                <Cascader.Panel
                    style={{ border: 'none', width: '100%' }}
                    options={dataMenu}
                    expandTrigger="hover"
                    changeOnSelect
                    onChange={onChange}
                />
            }
        >
            <div style={{margin: '0px 1.2rem', height: '100%', display:'flex', alignItems:'center', cursor:'pointer'}}>
                <Title className="m-0" level={5}>
                    Danh mục
                </Title>
            </div>
        </Popover>
    )
};

export default MenuCategory;