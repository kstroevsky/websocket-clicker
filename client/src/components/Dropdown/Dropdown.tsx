import classes from './styles/index.module.scss'
import React from 'react';
import Select, { GroupBase, Props } from "react-select";
import classNames from "classnames";

export function Dropdown<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
    >(props: Props<Option, IsMulti, Group>) {
    return (
        <Select
            {...props}
            classNames={{
                control: () => classes.control,
                menu: () => classes.menu,
                option: (state) => {
                    return classNames(classes.option, {
                        [classes.option_selected]: state.isSelected,
                    });
                },
                container: () => classes.container,
            }}
        />
    );
}