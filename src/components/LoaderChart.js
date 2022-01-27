import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderChart = (props) => {
  const width = window.innerWidth
  const height = window.innerHeight
  return (
  <ContentLoader
    speed={2}
    width={width}
    height={height / 2}
    viewBox="0 0 1280 720"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="243" rx="0" ry="0" width="83" height="477" />
    <rect x="114" y="64" rx="0" ry="0" width="83" height="663" />
    <rect x="246" y="202" rx="0" ry="0" width="83" height="537" />
    <rect x="349" y="79" rx="0" ry="0" width="83" height="663" />
    <rect x="465" y="91" rx="0" ry="0" width="83" height="663" />
    <rect x="566" y="227" rx="0" ry="0" width="83" height="537" />
  </ContentLoader>
  )
}

export default LoaderChart
