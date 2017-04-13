import * as React from 'react';
import PropTypes from 'prop-types';

interface InitializeWithDataProps {
  initializer: () => void;
  children?: JSX.Element;
}

class InitializeWithData extends React.Component<InitializeWithDataProps, any> {
  static propTypes = {
    children: PropTypes.element.isRequired,
    initializer: PropTypes.func.isRequired,
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
