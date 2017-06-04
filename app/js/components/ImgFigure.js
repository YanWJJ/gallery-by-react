var React = require('react');

module.exports = React.createClass({

	handleClick: function(e){
		console.log("change")
		e.stopPropagation();
		e.preventDefault();

		if(this.props.arrange.isCenter){
			this.props.inverse();
		} else {
			this.props.center();
		}		
	},
	render: function(){
		var styleObj = {};
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}
		if(this.props.arrange.rotate){
			(['-ms-', '-moz-', '-webkit-', '-o-', '']).forEach(function(value){
				var vtrans = value + 'transform';
				styleObj[vtrans] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this))		
		}
		if(this.props.arrange.isCenter){
			styleObj.zIndex = 11;
		}
		var imgFigureClassName = "img-figure";
			imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse-img' : '';
			
		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>			
				</figcaption>
			</figure>
			);
	}
});