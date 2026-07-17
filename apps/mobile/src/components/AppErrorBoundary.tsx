import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: (props: { error: Error; reset: () => void }) => ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback({ error: this.state.error, reset: this.reset });
    }

    return this.props.children;
  }
}
