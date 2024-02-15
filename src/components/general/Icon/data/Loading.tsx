export const Loading = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" xmlSpace="preserve" {...props}>
      <rect x="2" y="8" width="4" height="10" opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="8; 3; 8"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="10" y="8" width="4" height="10" opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="8; 3; 8"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="18" y="8" width="4" height="10" opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="8; 3; 8"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  )
}
