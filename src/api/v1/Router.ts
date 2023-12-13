import { Router as expressRouter } from 'express';

import userRouter from './routers/common/UserRouter';
import videoRouter from './routers/VideoRouter';
import climberRouter from './routers/ClimberRouter';
import knnRouter from './routers/KNNRouter';
import chartDataRouter from './routers/ChartDataRouter';

export default () => {
    const router = expressRouter();

    router.use(videoRouter());
    router.use(userRouter());
    router.use(climberRouter());
    router.use(knnRouter());
    router.use(chartDataRouter());


    return router;
};