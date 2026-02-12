import React from 'react'

type BaseIconProps = {
  size?: number
  className?: string
} & React.SVGProps<SVGSVGElement>

export const createIcon =
  (Icon: React.FC<React.SVGProps<SVGSVGElement>>) => {
  	const Component = ({ size = 24, className, ...rest }: BaseIconProps) => (
	<Icon
	width={size}
	height={size}
	className={className}
	{...rest}
  		/>
  	)

  	Component.displayName = Icon.displayName || Icon.name || 'Icon'
  	return Component
  }
