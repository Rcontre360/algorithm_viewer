import React from 'react'

export const getRelativeCoordenades = (event: React.MouseEvent) => {
	const container = event.target as HTMLElement
	const rect = container.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return { x, y }
}

interface Point{
	x: number;
	y: number;
}

interface CircleBorderPoint{
	radius: number;
	center: Point;
	point: Point;
}

export const getCircleBorderPoint = ({
	radius,
	center,
	point
}:CircleBorderPoint)=>{

	const x1 = point.x,
		y1 = point.y,
		x2 = center.x,
		y2 = center.y;

	const angle = (y1 - y2) / (x1 - x2)
	const powAngle = Math.pow(angle, 2)

	if (x2 < x1) {
		radius *= -1
		console.log('minus')
	}

	const intersectionX = x2 - (radius / Math.sqrt(1 + powAngle));
	const intersectionY = angle * (intersectionX - x2) + y2;

	return {x:intersectionX,y:intersectionY}
}