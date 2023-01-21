import Jimp from 'jimp';
import { Region, screen, mouse } from '@nut-tree/nut-js';

import { SCREENSHOT_SIZE } from '../../constants';

const getScreenshotRegion = async () => {
    const point = await mouse.getPosition();

    const screenWidth = await screen.width();
    const screenHeight = await screen.height();

    let regionLeft = Math.max(0, point.x - SCREENSHOT_SIZE / 2);
    let regionTop = Math.max(0, point.y - SCREENSHOT_SIZE / 2);

    if (regionLeft + SCREENSHOT_SIZE > screenWidth) {
        regionLeft = screenWidth - SCREENSHOT_SIZE;
    }

    if (regionTop + SCREENSHOT_SIZE > screenHeight) {
        regionTop = screenHeight - SCREENSHOT_SIZE;
    }

    return new Region(regionLeft, regionTop, SCREENSHOT_SIZE, SCREENSHOT_SIZE);
};

export const printScreen = async () => {
    const region = await getScreenshotRegion();

    const imageBgr = await screen.grabRegion(region);
    const { data, width, height } = await imageBgr.toRGB();

    const jimpImage = new Jimp({ data, width, height });
    const buffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);

    screen.highlight(region);

    return buffer;
};
