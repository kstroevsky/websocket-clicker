import React from 'react';
import {FIRE_STYLE_CLASSNAME} from "utils/constants";
import { PageWrapper } from "../../components/PageWrapper";

export const Error404 = () => {
    return (
        <PageWrapper center>
            <div>
                <h1 className={FIRE_STYLE_CLASSNAME}>404</h1>
                <h1 className={FIRE_STYLE_CLASSNAME}>Page Not Found</h1>
            </div>
        </PageWrapper>
    );
};

export default React.memo(Error404);
