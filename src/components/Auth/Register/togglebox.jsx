import React, { Component } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import Terms from './termsandconditions'


class ToggleBox extends Component {
    

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
    }
    
  
	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

		if (opened){
			title ='Register Now !';
		}else{
			title ='Accept And Continue';
		}

		return (
			<div className="tc">
				<div className="boxTitle" >
                <Checkbox  onClick={this.toggleBox}
                color="primary" size="10px" 
                ></Checkbox><Terms></Terms>	
				</div>
				<div className="tag">
                <p style={{color:'#D4DCE1',fontWeight:'bold',fontSize:'18px',fontFamily:'mulish' }}>{title}</p>
				</div>
				{opened && (					
					<div className="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;