import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { err: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { err: null }

  static getDerivedStateFromError(err: Error) {
    return { err }
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error(err, info)
  }

  render() {
    if (this.state.err) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="font-serif text-xl text-danger">Something went wrong</h2>
          <p className="max-w-md text-sm text-ink-muted">{this.state.err.message}</p>
          <button
            type="button"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-amazon"
            onClick={() => this.setState({ err: null })}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
