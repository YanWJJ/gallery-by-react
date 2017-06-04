var React = require('react');
var ImgFigure = require('./ImgFigure.js');
var imageDatas = require('../../data/imageData.json');
var ReactDOM = require('react-dom');
var ControllerUnits = require('./ControllerUnit.js');

imageData = (function genImageURL( imageDatasArr ){
	for(var i = 0, j = imageDatasArr.length; i<j; i++){
		var singleImageData = imageDatasArr[i];

		singleImageData.imageURL = '../../images/' + singleImageData.fileName;
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

function getRangeRandom(low, high){
	var range = Math.ceil(Math.random()*(high-low)) + low;
	return range;
}

function get30Deg(){
	var deg = (Math.random() < 0.5 )? (Math.random()*30 ): ("-"+ Math.random()*30 );
	return deg;
}

module.exports = React.createClass({
	getInitialState: function(){
		return {
			value  : imageDatas,
			imgsArrangeArr: [
				{

				}
			]
		}
	},
	Constant: {
		centerPos:{
			left : 0,
			right: 0
		},
		hPosRange : {
			leftSecX: [0, 0],
			rightSecX: [0, 0],
			y : [0, 0]		
		},
		vPosRange:{
			x:[0, 0],
			topY: [0, 0]
		}
	},

	inverse: function(index){
		return function(){
			var imgsArrangeArr = this.state.imgsArrangeArr;

			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({imgsArrangeArr : imgsArrangeArr});
		}.bind(this);
	},
	center: function(index){
		return function(){
			this.rearrange(index);
		}.bind(this);
	},
	rearrange: function(centerIndex){
		var imgsArrangeArr     = this.state.imgsArrangeArr,
			Constant 	       = this.Constant,
			centerPos          = Constant.centerPos,
			hPosRange          = Constant.hPosRange,
			vPosRange          = Constant.vPosRange,
			hposRangeLeftSecX  = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY         = hPosRange.y,
			vPosRangeTopY      = vPosRange.topY,
			vPosRangeX         = vPosRange.x,

			imgsArrangeTopArr           = [],
			topImgNum                   = Math.ceil(Math.random()*2),
			topImgSpliceIndex           = 0,
			imgsArrangeCenterArr        = imgsArrangeArr.splice(centerIndex, 1);
			imgsArrangeCenterArr[0] = {
				pos: centerPos,
				rotate: 0,
				isInverse : false,
				isCenter: true
			}

			topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));

			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

			imgsArrangeTopArr.forEach(function(value, index){
				imgsArrangeTopArr[index] = {
					pos: {
						top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
						left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])					
					},
					rotate : get30Deg(),
					isInverse : false,
					isCenter: false
				};
			});

			for(var i = 0, j = imgsArrangeArr.length, k= j/2;i< j; i++){
				var hPosRangeLORX = null;
				if(i < k){
					hPosRangeLORX = hposRangeLeftSecX;
				} else {
					hPosRangeLORX = hPosRangeRightSecX;
				}

				imgsArrangeArr[i] = {
					pos: {
						top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
						left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])					
					},
					rotate: get30Deg(),
					isInverse : false,
					isCenter: false
				}
			}

			if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
				imgsArrangeArr.splice(topImgSpliceIndex, 0 , imgsArrangeTopArr[0]);
			}
			imgsArrangeArr.splice(centerIndex, 0 , imgsArrangeCenterArr[0]);
			console.log(imgsArrangeArr)
			this.setState({imgsArrangeArr: imgsArrangeArr});
	},
	componentDidMount: function(){
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
		stageW       = stageDOM.scrollWidth,
		stageH       = stageDOM.scrollHeight,
		halfStageW   = Math.ceil(stageW / 2),
		halfStageH   = Math.ceil(stageH / 2);

		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
		imgW             = imgFigureDOM.scrollWidth,
		imgH             = imgFigureDOM.scrollHeight,
		halfImgH         = Math.ceil(imgH / 2),
		halfImgW         = Math.ceil(imgW / 2);

		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH +100
		}	

		this.Constant.hPosRange.leftSecX[0]  = -halfImgW;
		this.Constant.hPosRange.leftSecX[1]  = halfStageW - halfImgW * 3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0]         = -halfImgH;
		this.Constant.hPosRange.y[1]         = stageH - halfImgH;
		this.Constant.vPosRange.topY[0]      = -halfImgH;
		this.Constant.vPosRange.topY[1]      = halfStageH - halfImgH * 3;
		this.Constant.vPosRange.x[0]         = halfStageW - halfImgW;
		this.Constant.vPosRange.x[1]         = halfStageW;
		this.rearrange(0);
	},
	render: function(){
		var controllerUnits = [],
			imgFigures      = [];
		var value = this.state.value;
		imageDatas.forEach(function(value, index){
			if(!this.state.imgsArrangeArr[index]){
				this.state.imgsArrangeArr[index] = {
					pos: {
						left : 0,
						top  : 0
					},
					rotate: 0,
					isInverse : false,
					isCenter: false
				};
			}
			imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
			controllerUnits.push(<ControllerUnits arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);			
		}.bind(this));
		return (
			<section className="stage" ref="stage">
				<section className="img-src">
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		);
	}
});