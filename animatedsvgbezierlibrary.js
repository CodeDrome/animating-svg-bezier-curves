class AnimatedSVGBezier
{
	static #generatePath(points, relative)
	{
    	let type = null;

    	if(points.length === 3)
    	{
        	type = "Q";
    	}
    	else if(points.length === 4)
    	{
        	type = "C";
    	}
    	else if(points.length % 2 === 0)
    	{
        	type = "C";
    	}
    	else
    	{
        	throw 'Number of points must be 3 or an even number more than 3';
    	}

    	const pathPoints = ["M ", points[0][0], ",", points[0][1], type];

    	for(let p = 1, l = points.length; p < l; p++)
    	{
        	if(p >= 4 && p % 2 === 0)
            	pathPoints.push("S");

        	pathPoints.push(points[p][0]);
        	pathPoints.push(",");
        	pathPoints.push(points[p][1]);
    	}

    	return pathPoints.join(" ");
	}


	static animateBezier(settings)
	{
		const startPoints = [];

		// clone points
		for(let point of settings.points)
		{
			startPoints.push([point[0],point[1]]);
		}

		for(let point of startPoints)
		{
			switch(settings.startType)
			{
				case "top":
					point[1] = 0;
					break;
				case "bottom":
					point[1] = settings.svgSize.height;
					break;
				case "left":
					point[0] = 0;
					break;
				case "right":
					point[0] = settings.svgSize.width;
					break;
			}
		}

		const startPath = AnimatedSVGBezier.#generatePath(startPoints);
		const finalPath = AnimatedSVGBezier.#generatePath(settings.points);

		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    	path.setAttributeNS(null, "d", startPath);
    	path.setAttributeNS(null, "stroke", settings.strokeColor);
		path.setAttributeNS(null, "fill", "transparent");
		path.setAttributeNS(null, "stroke-width", settings.strokeWidth);
    	document.getElementById(settings.id).appendChild(path);

    	anime(
    	{
    	    	targets: path,
				d: finalPath,
    	    	duration: settings.duration,
    	    	easing: 'easeInOutQuad'
    	});
	}
}
