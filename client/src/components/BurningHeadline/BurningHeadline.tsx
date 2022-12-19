import React, {FC, ElementType} from 'react';
import {FIRE_STYLE_CLASSNAME} from "../../utils/constants";
import classes from './style/index.module.scss';
import classNames from "classnames";

type BurningHeadlineType = {
    title: string;
    tagName?: ElementType;
    className?: string;
    style?: React.CSSProperties;
    isUpperCase?: boolean;
}

export const BurningHeadline: FC<BurningHeadlineType> = (
    {title, tagName: Tag = 'span', className, style, isUpperCase}
) => {
    const tagClassNames = classNames(FIRE_STYLE_CLASSNAME, className, classes.burningHeadlineContainer, {
        [classes.upperCase]: isUpperCase,
    });

    return (
        <Tag className={tagClassNames} style={style}>
            {title}
        </Tag>
    );
}