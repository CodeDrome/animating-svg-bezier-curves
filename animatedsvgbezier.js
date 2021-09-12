

"use strict"


window.onload = function()
{
	bezier();
}


function randomPosition(max)
{
    return Math.floor(Math.random() * max);
}


function generateRandomPoints(xmax, ymax)
{
    const pointcounts = [3,4,6,8,10,12];
    const pointcount = pointcounts[Math.floor(Math.random() * 6)];

    let points = [];

    for(let i = 0; i < pointcount; i++)
    {
        const point = [randomPosition(xmax), randomPosition(ymax)];

        points.push(point);
    }

    return points;
}


function getRandomColour()
{
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return `rgb(${r},${g},${b})`;
}


function getRandomStartType()
{
    const startTypes = ["top","left","bottom","right"];

    return startTypes[Math.floor(Math.random() * 4)];
}


function bezier()
{
    const beziers = [];

    for(let i = 0; i <= 32; i++)
    {
        const bezier =
        {
            id: "svg",
            svgSize: {width: 800, height: 600},
            points: generateRandomPoints(800, 600),
            startType: getRandomStartType(),
            strokeColor: getRandomColour(),
			strokeWidth: 1,
            duration: Math.floor(Math.random() * 8000) + 2000
        }

        beziers.push(bezier);
    }

    for(let bezier of beziers)
    {
        AnimatedSVGBezier.animateBezier(bezier);
    }
}
