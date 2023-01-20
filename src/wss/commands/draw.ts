import { Button, down, left, mouse, Point, right, straightTo, up } from '@nut-tree/nut-js';

export const drawRectangle = async (width: number, length: number) => {
    const moveOrders = [
        () => right(width),
        () => down(length),
        () => left(width),
        () => up(length),
    ];

    for (let i = 0; i < moveOrders.length; i++) {
        const moveTo = moveOrders[i];

        await mouse.drag(moveTo());
    }
};

export const drawCircle = async (radius: number) => {
    const currentPosition = await mouse.getPosition();
    const centerPosition = new Point(currentPosition.x + radius, currentPosition.y);

    await mouse.pressButton(Button.LEFT);

    for (let i = 0; i <= 2 * Math.PI; i += 0.05) {
        const x = centerPosition.x - radius * Math.cos(i);
        const y = centerPosition.y - radius * Math.sin(i);

        await mouse.move(straightTo(new Point(x, y)));
    }

    await mouse.releaseButton(Button.LEFT);
};
