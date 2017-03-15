import * as React from 'react';

interface InitializeWithDataProps {
  initializer: () => void;
  children?: JSX.Element;
}

class InitializeWithData extends React.Component<InitializeWithDataProps, any> {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    initializer: React.PropTypes.func.isRequired,
  }
  constructor(props: InitializeWithDataProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.initializer();
  }

  public render() {
    return this.props.children;
  }
}

export default InitializeWithData;
