import React from "react";
import {
  Col,
  FormGroup,
  Label,
  FormFeedback,
  InputGroup
} from "reactstrap";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import AsyncSelect from "react-select/async";
import "./index.scss";
// core components
class VideoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  getDetails = () => {
    const { tags, selectSetOptions } = this.props;
    return {
      tags,
      setId: selectSetOptions ? selectSetOptions.value : null
    };
  };
  render() {
    const { selectSetOptions, setReducer, tags, errors } = this.props;
    const { recentSetAdded, allSetList } = setReducer;
    let recentAddedSet,
      defaultSetoptions = [];
    if (allSetList && allSetList.length) {
      allSetList.map(data => {
        const defaultSetoptionsValue = {
          label: data.title,
          value: data._id
        };
        defaultSetoptions.push(defaultSetoptionsValue);
        return true;
      });
    }
    if (recentSetAdded && recentSetAdded.value) {
      recentAddedSet = {
        label: recentSetAdded.title,
        value: recentSetAdded._id
      };
    }
    return (
      <>
        <Col md={"6"} className="trim-video-text">
          <div>
            <div className={"font-weight-bold h4"}>Trim your video</div>
            <span>
              Use sliders below to trim your video (15 secs max).Or use your
              arrow keys on timestamps to get really precise.
            </span>
          </div>
          <FormGroup className="flex-fill flex-column mt-3 input-w">
            {/* add tag-input-wrap class for tagInput design  */}
            <Label className="">Add tag and press enter for separate</Label>
            <div className="w-100 tag-input-wrap">
              <TagsInput
                value={tags}
                className={"form-control"}
                maxTags={"5"}
                onChange={this.props.handleTagChange}
              />
            </div>
          </FormGroup>
          <FormGroup className="flex-fill flex-column mt-3">
            {/* add search-select class for search select design  */}
            <Label>select sets</Label>
            <InputGroup>
              <div className="w-100 search-select-wrap">
                <AsyncSelect
                  loadOptions={this.loadSets}
                  isClearable={selectSetOptions.value ? true : false}
                  defaultOptions={defaultSetoptions}
                  className={errors && errors.setId ? "is-invalid form-control no-form-control" : ""}
                  onChange={e => this.props.handleInputChange(e)}
                  value={recentAddedSet ? recentAddedSet : selectSetOptions}
                />
                <FormFeedback>
                  {
                    errors && errors.setId ? errors.setId : null
                  }
                </FormFeedback>
              </div>
            </InputGroup>
          </FormGroup>
        </Col>
      </>
    );
  }
}

export default VideoDetails;
