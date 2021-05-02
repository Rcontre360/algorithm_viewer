import React from 'react'

export const getRelativeCoordenades = (event: React.MouseEvent) => {
	const container = event.target as HTMLElement
	const rect = container.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return { x, y }
}