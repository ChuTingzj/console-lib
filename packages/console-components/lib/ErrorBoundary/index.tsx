import  { Component, type ErrorInfo,type ReactNode } from 'react';

interface ErrorBoundaryProps{
  onError:(error:Error,errorInfo:ErrorInfo)=>void
  children:ReactNode
}
interface ErrorBoundaryState{
  error:Error|null
}
export default class ErrorBoundary extends Component<ErrorBoundaryProps,ErrorBoundaryState> {
 state: Readonly<ErrorBoundaryState> = {
  error:null
 };
  static getDerivedStateFromError(error:Error) {
    return {error};
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError(error,errorInfo);
  }
  render() {
    if(this.state.error){
      return <h2>🚨:{this.state.error.message}</h2>;
    }
    return this.props.children;
  }
}
