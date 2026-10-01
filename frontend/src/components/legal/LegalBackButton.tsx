import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../ui/Icon'

export function LegalBackButton() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <button type="button" className="btn btn-ghost btn-sm legal-back" onClick={handleBack}>
      <Icon name="arrow-left" />
      Back
    </button>
  )
}
