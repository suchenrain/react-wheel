import React from 'react';

interface IState {
  data: any;
}
export default (WrappedComponent: any, name: string) => {
  class LocalStorageActions extends React.Component<any, IState> {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      };
    }

    componentWillMount() {
      let data = localStorage.getItem(name);
      if (!data) {
        this.setState({ data });
        return;
      }
      try {
        this.setState({ data: JSON.parse(data) });
      } catch (e) {
        this.setState({ data });
      }
    }

    saveData = data => {
      try {
        localStorage.setItem(name, JSON.stringify(data));
      } catch (e) {
        localStorage.setItem(name, `${data}`);
      }
    };

    render() {
      return (
        <WrappedComponent
          data={this.state.data}
          saveData={this.saveData}
          {...this.props}
        />
      );
    }
  }
  return LocalStorageActions;
};
