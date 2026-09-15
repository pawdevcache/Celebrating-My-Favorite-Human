import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="page nf">
      <div className="shell nf__inner">
        <span className="nf__emoji" aria-hidden="true">
          🎈
        </span>
        <h1 className="nf__code display gradient-text">404</h1>
        <p className="nf__text">
          This page ran off somewhere. Everything else is still here though.
        </p>
        <Link to="/" className="btn">
          Take me back home
        </Link>
      </div>
    </div>
  )
}
