import React from 'react';
import PropTypes from 'prop-types';


export class OutsideAlerter extends React.Component {
   constructor(props) {
      super(props);
      this.setWrapperRef = this.setWrapperRef.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
   }

   componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
   }

   componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
   }

   setWrapperRef(node) {
      this.wrapperRef = node;
   }

   handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
         this.props.onOutside();
      }
   }

   render() {
      return <div className="outsideAlerter" ref={this.setWrapperRef}>{this.props.children}</div>;
   }
}

OutsideAlerter.propTypes = {
   children: PropTypes.element.isRequired,
};
