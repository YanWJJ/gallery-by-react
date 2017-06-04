var React = require('react');

module.exports = React.createClass({
	handleClick: function(e){
		console.log("change")
		e.stopPropagation();
		e.preventDefault();
		console.log(this.props.arrange.isInverse)
		if(this.props.arrange.isCenter){
			this.props.inverse();
		} else {
			this.props.center();
		}		
	},

	render: function(){
		var controllerUnitClassName = "controller-unit" ;
	    	controllerUnitClassName += this.props.arrange.isCenter ? " is-center" : "";
	    	controllerUnitClassName += this.props.arrange.isInverse ? " is-inverse-controller" : "";
	    	console.log(controllerUnitClassName)
		return (
				<span className={controllerUnitClassName}  onClick={this.handleClick}>
					
				</span>
			);
	}
})