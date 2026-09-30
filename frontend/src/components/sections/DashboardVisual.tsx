import { walletBars, walletFigure } from './featuresContent'

export function DashboardVisual() {
  return (
    <div className="wallet">
      <small>Available to withdraw</small>
      <strong>{walletFigure}</strong>
      <div className="bars">
        {walletBars.map((height, index) => (
          <i key={index} style={{ ['--i' as string]: index, height: `${height}%` }} />
        ))}
      </div>
    </div>
  )
}
