import React, { Component } from 'react';

import Modal from "../../components/UI/Modal/Modal";


const withErrorHandeling = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props){
            super(props);

            this.state = {
                error: null,
            }
            
             // Axios listners
             this.reqInterceptor = axios.interceptors.request.use( req => {
                // clean the error
               this.setState({error: null});
               return req; 
           });
           this.resInterceptor = axios.interceptors.response.use(res => res, error => {
               this.setState({error: error});
           });
        }

        // This method is responsible for cleaning the interceptors since
        // if they will create new ones on each call from difrent components
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render(){
            return (
                <>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
};


export default withErrorHandeling;