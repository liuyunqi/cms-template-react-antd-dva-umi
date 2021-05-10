
import React, { useState, useEffect} from 'react';
import { connect, Dispatch } from 'umi';
import { Button, Input } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

import './searchHeader.less';

interface IProps {
    dispatch: Dispatch;

    className?: string;
    onAdd?: () => void;
    onRefresh?: () => void;
    onChange?: (e: HTMLElement) => void;
    onSearch?: () => void;
}

const SearchHeader: React.FC<IProps> = (props) => {

    const {
        className,
        
        onAdd,
        onRefresh,
        onChange,
        onSearch
    } = props;

    return (
        <div className={`common-tableHeader-wrapp ${className}`}>
            <div className="item-box">
                <Button type="primary" onClick={ onAdd }>新增</Button>
                <Button type="default" icon={<RedoOutlined />} onClick={ onRefresh }>重置刷新</Button>
            </div>
            <div className="item-box textAlign-R">
                <Input className="searchInput" placeholder="请输入..." onChange={ (e) => onChange(e) } />
                <Button type="primary" onClick={ onSearch }>搜索</Button>
            </div>
        </div>
    )
}


const mapStateToProps = (ALL) => {
    const { loading } = ALL;
    return {
        ...loading
    }
}

export default connect(mapStateToProps)(SearchHeader);