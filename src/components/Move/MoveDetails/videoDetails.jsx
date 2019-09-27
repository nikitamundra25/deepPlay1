import React from "react";
import {
  Col,
  FormGroup,
} from "reactstrap";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import AsyncSelect from 'react-select/async';
import "./index.scss"

// core components
class VideoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      selectSetOptions: {
        label: "Type to select sets",
        value: ""
      }
    };
  }

  componentDidUpdate = ({ setReducer }) => {
    if (setReducer !== this.props.setReducer) {
      const recetSet = this.props.setReducer
      if (recetSet) {
        this.setState({
          selectSetOptions: {
            label: recetSet && recetSet.title ? recetSet.title : "Untitled",
            value: recetSet && recetSet._id ? recetSet._id : ""
          }
        })
      }
    }
  }

  handleChange = (tags) => {
    this.setState({
      tags
    })
  }
  handleInputChange = (e) => {
    console.log("@@@@@@@@@@@@", e)
  }

  render() {
    const { selectSetOptions } = this.state
    return (
      <>
        <Col md={"6"}>
          <div>
            <h3 className={"pb-3"}><strong>Trim your video</strong></h3>
            <span>Use sliders below to trim your video (15 secs max).Or use your arrow keys on timestamps to get really precise.</span>
          </div>
          <FormGroup className="flex-fill flex-column mt-3">
            <div className="w-100">
              <TagsInput
                value={this.state.tags}
                className={"form-control"}
                maxTags={"5"}
                onChange={this.handleChange}
              />
            </div>
          </FormGroup>
          <FormGroup className="flex-fill flex-column mt-3">
            <div className="w-100">
              <AsyncSelect
                loadOptions={this.loadSets}
                defaultOptions
                onInputChange={() => this.handleInputChange()}
                value={selectSetOptions}
              />
            </div>
          </FormGroup>
        </Col>
      </>
    );
  }
}

export default VideoDetails;
