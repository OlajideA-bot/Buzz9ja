import { Icon } from '../ui/Icon'

export function VerifyVisual() {
  return (
    <div className="idcard">
      <div className="row">
        <div className="av" />
        <div style={{ flex: 1 }}>
          <div className="ln" />
          <div className="ln s" />
        </div>
      </div>
      <div className="meta">
        <span>NIN</span>
        <span>Verified</span>
      </div>
      <div className="stamp">
        <Icon name="check" />
      </div>
    </div>
  )
}
