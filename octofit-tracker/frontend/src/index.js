import 'bootstrap/dist/css/bootstrap.min.css'
import './index.jsx'
import { API_BASE } from './config'

console.log('Frontend starting. API base:', API_BASE)

if (!process.env.REACT_APP_CODESPACE_NAME) {
  console.warn('REACT_APP_CODESPACE_NAME is not set; API calls will be broken until it is configured.')
}
