import * as React from 'react';
export interface IndexAppProps {
  test:string;
}
import './test.css';

export default class IndexApp extends React.Component<IndexAppProps, any> {
  public render() {
    return (
      <div className="test">
        hello
      </div>
    );
  }
}


