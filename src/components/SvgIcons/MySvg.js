import * as React from "react"
import Svg, { Path } from "react-native-svg"

const MySvg = (props) => {
  const {width,height,color,path} = props
  return <Svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d={path}
      fill={color}
    />
  </Svg>
}

export default MySvg
